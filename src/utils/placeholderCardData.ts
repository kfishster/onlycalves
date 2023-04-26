import { VotingCard } from "../store/cardsSlice"

const placeholderImgUrls = ["https://thumbs.dreamstime.com/b/fitness-healthy-leg-muscle-leg-muscleillustration-design-vector-isolated-white-background-122386596.jpg", "https://img.freepik.com/free-vector/medical-infographic-achilles-tendon_1308-50608.jpg?w=1380&t=st=1682509301~exp=1682509901~hmac=5caa998514433d5b3964a62dd9ca4aea7ac706b280c614e6570a8057a9052d82"]
const placeholderSubtitles = ["Scorpio, but doesn't act like it", "Exfoliates regularly", "Viral on tiktok, but for the wrong reasons"]

export const getPlaceholderCard = (): VotingCard => {
    const imgUrl = placeholderImgUrls[Math.floor(Math.random() * placeholderImgUrls.length)]
    const subtitle = placeholderSubtitles[Math.floor(Math.random() * placeholderSubtitles.length)]
    const calfNum = Math.floor(Math.random() * 13)

    return {
        imgUrl: imgUrl,
        title:`Calf ${calfNum}`,
        subtitle:subtitle
    }
}