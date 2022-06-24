import User from "../model/user";

export async function getSponsorship(id: number) {
    return await User.findOne({where: { id }});
}

export async function addSponsorship(id: number) {
    return await User.update({ sponsorship: new Date() },{ where: { id } });
}
