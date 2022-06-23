import User from "../model/user";
import SponsorshipPayload from "../types/sponsorship/SponsorshipPayload";

export async function getSponsorship(email: string) {
    return await User.findOne({where: {email: email}});
}

export async function addSponsorship(payload: SponsorshipPayload) {
    return await User.update({ sponsorship: payload.sponsorship },{ where: { email: payload.email } });
}
