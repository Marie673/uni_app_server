import {AppDataSource} from "../../infrastructure/db/data-source";
import {Inquiry} from "../entity/Inquiry";
import {insertUser} from "../../infrastructure/db/utils";


const inquiryRepository = AppDataSource.getRepository(Inquiry)


export async function getInquiry () {

}

export async function postInquiry(inquiry: Inquiry) {
    await inquiryRepository.save(inquiry)
}