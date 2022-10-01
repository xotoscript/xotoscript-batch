import axios from "axios"

export async function getDummyImage(numberOfImage: number, page = Math.floor(Math.random() * 100 + 1)) {
    const { data } = await axios.get<never, any>("https://picsum.photos/v2/list?page=" + page + "&limit=" + numberOfImage);
    let imageList = data.map((el) => `https://picsum.photos/id/${el.id}/200/200`);
    if (!imageList.length) return await getDummyImage(numberOfImage);
    return imageList;
}