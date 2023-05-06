import { VotingCard } from "../store/cardsSlice";

const placeholderImgUrls = [
  "https://thumbs.dreamstime.com/b/fitness-healthy-leg-muscle-leg-muscleillustration-design-vector-isolated-white-background-122386596.jpg",
  "https://img.freepik.com/free-vector/medical-infographic-achilles-tendon_1308-50608.jpg?w=1380&t=st=1682509301~exp=1682509901~hmac=5caa998514433d5b3964a62dd9ca4aea7ac706b280c614e6570a8057a9052d82",
  "https://onlycalvesstore.blob.core.windows.net/asd/8AD7DD3C-CF9E-4A7F-A6A8-2D4DA5025D36.JPG",
];
const placeholderSubtitles = [
  "Scorpio, but doesn't act like it",
  "Exfoliates regularly",
  "Viral on tiktok, but for the wrong reasons",
];

export const getRandomImgUrl = (): string => {
  return placeholderImgUrls[
    Math.floor(Math.random() * placeholderImgUrls.length)
  ];
};

export const getPlaceholderCard = (imgUrlIdx?: number): VotingCard => {
  const imgUrl = imgUrlIdx ? placeholderImgUrls[imgUrlIdx] : getRandomImgUrl();
  const subtitle =
    placeholderSubtitles[
      Math.floor(Math.random() * placeholderSubtitles.length)
    ];
  const calfNum = Math.floor(Math.random() * 13);

  return {
    userId: "",
    imgUrl: imgUrl,
    title: `Calf ${calfNum}`,
    subtitle: subtitle,
  };
};
