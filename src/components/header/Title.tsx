import { AuroraText } from "../magicui/aurora-text";

export const Title = () => {
  return (
    <h1 className="text-4xl flex flex-col sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
      <span className="text-3xl sm:text-4xl md:text-5xl roboto-400">👋🏻 Hi there!</span>
      <AuroraText className="roboto-700">I'm Daniel Uribe</AuroraText>
    </h1>
  );
};
