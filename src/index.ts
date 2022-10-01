import { BatchEnums } from './enums/BatchEnums';
import inquirer from "inquirer";
import BatchFaker from './batch-faker/BatchFaker';

async function run() {

    const { batchSelected } = await inquirer.prompt({
        name: "batchSelected",
        type: "list",
        message: "What batch system would you like to launch? 🚀",
        choices: [BatchEnums.FAKER],
        default: 0,
    });

    if (batchSelected === BatchEnums.FAKER) {
        await BatchFaker()
    }

    console.log("Done ✅")

}

run()