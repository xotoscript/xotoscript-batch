import { gql } from '@apollo/client';
import axios from 'axios'
import { apolloUtility } from '../services/Apollo';
import { CreateVendorMutation, CreateVendorMutationVariables } from './__graphql__/CreateVendorMutation';
import faker from "faker"
import { CreateShopMutation, CreateShopMutationVariables } from './__graphql__/CreateShopMutation';
import { CreateProductMutation, CreateProductMutationVariables } from './__graphql__/CreateProductMutation';
import { getDummyImage } from '../services/DummyImage';
import { ColorDictionary, CategoryOptionListCustomClass, CategoryCustomClass, CategoryStructureConfiguration } from "@xotosphere/xotosphere-global-shared";
import { CreateCollectionMutation, CreateCollectionMutationVariables } from './__graphql__/CreateCollectionMutation';
import { CreateMeetupMutation, CreateMeetupMutationVariables } from './__graphql__/CreateMeetupMutation';
import { ProductRateMutation, ProductRateMutationVariables } from './__graphql__/ProductRateMutation';

export default async function () {
    /**
     * Loop into each city
     */

    try {
        const jobs: Promise<any>[] = [];

        const countryListRaw = await axios.get("http://localhost:8443/api/geolocation/country-list")
        const countryList = countryListRaw.data.data as { name: string;  iso2: string}[]
        for (let country of countryList) {
            const countryRaw = await axios.get("http://localhost:8443/api/geolocation/country-list/" + country.iso2)
            const countryData = countryRaw.data.data;
            const cities = countryData.cities as { name: string }[]
            
            for (let city of cities) {
                for (let i = 0; i < 2; i++)  {
                    const job = addDataInCity({ city: city.name, countryCode: country.iso2 })
                    jobs.push(job)
                }
            }
        }

        await Promise.all(jobs)
    } catch (error) {
        console.log(error.networkError?.result?.errors || error)
    }
}

async function createUser(data: { city: string; countryCode: string }) {
    const { data: { userSignup } } = await apolloUtility.mutate<CreateVendorMutation, CreateVendorMutationVariables>({
        mutation: gql`
            mutation CreateVendorMutation($userSignupInput: UserSignupInput!) {
                userSignup(data: $userSignupInput) {
                    token
                    user {
                        _id
                        firstName
                    }
                }
            }
        `,
        variables: {
            userSignupInput: {
                city: data.city,
                countryCode: data.countryCode,
                firstName: faker.name.firstName() + " " + faker.name.lastName(),
                email: faker.internet.email(),
                password: "0000",
                userCurrency: "EUR"
            }
        },
    })
    return userSignup;
}

async function addDataInCity(data: { city: string; countryCode: string }) {
    /**
     * Create vendor
     */
    const { user: vendor, token } = await createUser(data)
    /**
     * Create shop
     */

    const {data: {shopCreate}} = await apolloUtility.mutate<CreateShopMutation, CreateShopMutationVariables>({
        mutation: gql`
            mutation CreateShopMutation($shopCreateInput: ShopCreateInput!) {
                shopCreate(data: $shopCreateInput) {
                    _id
                    category
                }
            }
        `,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        variables: {
            shopCreateInput: {
                shopName: faker.company.companyName(2),
                category: ["art", "clothing", "craft", "furniture", "hightech"].at(Math.floor(Math.random() * 5)),
                display: faker.datatype.boolean(),
                isFeatured: faker.datatype.boolean(),
                description: faker.lorem.sentence(3),
                mission: faker.lorem.sentence(1),
                banner: faker.lorem.sentence(1),
            }
        }
    })

    /**
     * Create products
     */

    const productList: CreateProductMutation["productCreate"][] = []

    for (let i = 0; i < 4; i++) {

        const categoryColorList = ColorDictionary.map((colorObj) => colorObj.title);
        const categorySubColorCodeList = (subColorCode: string) => Object.keys(ColorDictionary.find((colorObj) => colorObj.title === subColorCode).subColorCodeList);
        const categorySectionList = (categoryTitle: string) => CategoryStructureConfiguration.find((categoryObj: CategoryCustomClass) => categoryObj.title === categoryTitle).categorySectionList.map((categoryObj: CategoryOptionListCustomClass) => categoryObj.title);
        const categoryFilterOptionList = (categoryTitle: string) => CategoryStructureConfiguration.find((categoryObj: CategoryCustomClass) => categoryObj.title === categoryTitle).categoryOptionList;
        const categorySubcategoryList = (categoryTitle: string, sectionTitle: string) => CategoryStructureConfiguration.find((categoryObj) => categoryObj.title === categoryTitle).categorySectionList.find((sectionObj) => sectionObj.title === sectionTitle).subcategoryList;
        
        const colorCode = categoryColorList[faker.datatype.number(categoryColorList.length - 1)];
        const subColorCode = categorySubColorCodeList(colorCode)[faker.datatype.number(categorySubColorCodeList(colorCode).length - 1)];
        const category = shopCreate.category
        const section = categorySectionList(category)[faker.datatype.number(categorySectionList(category).length - 1)];
        const subcategory = categorySubcategoryList(category, section)[faker.datatype.number(categorySubcategoryList(category, section).length - 1)];
        const filterOptionList = categoryFilterOptionList(category);
        const categoryOptionList = filterOptionList.map((filterOption) => {
            return { title: filterOption.title, value: filterOption.subcategoryList[faker.datatype.number(filterOption.subcategoryList.length - 1)] };
        });

        const {data: {productCreate}} = await apolloUtility.mutate<CreateProductMutation, CreateProductMutationVariables>({
            mutation: gql`
                mutation CreateProductMutation($productCreateInput: ProductCreateInput!) {
                    productCreate(data: $productCreateInput) {
                        _id
                    }
                }
            `,
            context: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            variables: {
                productCreateInput: {
                    title: faker.commerce.productName() + " " + faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    originalPrice: faker.datatype.number({
                        min: 1,
                        max: 1000
                    }),
                    productCurrency: "EUR",
                    category: category,
                    section: section,
                    subcategory: subcategory,
                    imgUrlList: await getDummyImage(4),
                    inventory: faker.datatype.number({
                        min: 1,
                        max: 100,
                    }),
                    tag: [faker.lorem.word(), faker.lorem.word()],
                    isOnSale: faker.datatype.boolean(),
                    salePercentage: faker.datatype.number(80),
                    colorCode: colorCode,
                    subColorCode: subColorCode,
                    categoryOptionList: categoryOptionList
                }
            }
        })

        productList.push(productCreate)
    }

    /**
     * Create collections
     */

     await apolloUtility.mutate<CreateCollectionMutation, CreateCollectionMutationVariables>({
        mutation: gql`
            mutation CreateCollectionMutation($collectionCreateInput: CollectionCreateInput!) {
                collectionCreate(data: $collectionCreateInput) {
                    _id
                }
            }
        `,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        variables: {
            collectionCreateInput: {
                title: faker.lorem.sentence(4),
                subtitle: faker.lorem.sentence(4),
                description: faker.lorem.sentence(10),
                productList: productList.map(p => p._id),
            }
        }
    })

    /**
     * Create meetup
    */
    await apolloUtility.mutate<CreateMeetupMutation, CreateMeetupMutationVariables>({
        mutation: gql`
            mutation CreateMeetupMutation($meetupCreateInput: MeetupCreateInput!) {
                meetupCreate(data: $meetupCreateInput) {
                    _id
                }
            }
        `,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        variables: {
            meetupCreateInput: {
                title: faker.lorem.lines(1),
                description: faker.lorem.paragraph(),
                imgUrlList: await getDummyImage(4),
                productList: productList.map(p => p._id),
                startDate: faker.date.soon(1),
                endDate: faker.date.soon(2),
                address: faker.address.streetAddress(),
            }
        }
    })

    /**
     * Add reviews
     */

    const { token: reviewerToken } = await createUser(data)

    for (let product of productList) {
         await apolloUtility.mutate<ProductRateMutation, ProductRateMutationVariables>({
            mutation: gql`
            mutation ProductRateMutation($data: ProductRateInput!, $id: String!) {
                productRate(data: $data, id: $id) {
                    _id
                }
            }
            `,
            context: {
                headers: {
                    Authorization: `Bearer ${reviewerToken}`
                }
            },
            variables: {
                data: {
                    review: faker.lorem.paragraph(),
                    stars: Math.floor(Math.random() * 5 + 1)
                },
                id: product._id
            }
        })
    }



    console.log(`${data.city} ${data.countryCode} Completed ✅`)
    
}