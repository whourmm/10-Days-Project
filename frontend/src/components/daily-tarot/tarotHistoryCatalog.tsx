import TarotHistoryCard from "./tarotHistoryCard"

const TarotHistoryCatalog: React.FC = ({}) => {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
      <TarotHistoryCard cardId="1" cardName="The Fool" cardDate="2021-10-10" cardImage="/images/tarot/the-fool.png" cardDescription="The Fool is the first card of the Major Arcana in the Tarot deck. It is the card of new beginnings, opportunity, and potential." />
      <TarotHistoryCard cardId="2" cardName="The Fool" cardDate="2021-10-10" cardImage="/images/tarot/the-fool.png" cardDescription="The Fool is the first card of the Major Arcana in the Tarot deck. It is the card of new beginnings, opportunity, and potential." />
      <TarotHistoryCard cardId="3" cardName="The Fool" cardDate="2021-10-10" cardImage="/images/tarot/the-fool.png" cardDescription="The Fool is the first card of the Major Arcana in the Tarot deck. It is the card of new beginnings, opportunity, and potential." />
      <TarotHistoryCard cardId="3" cardName="The Fool" cardDate="2021-10-10" cardImage="/images/tarot/the-fool.png" cardDescription="The Fool is the first card of the Major Arcana in the Tarot deck. It is the card of new beginnings, opportunity, and potential." />
    </div>
  )
}

export default TarotHistoryCatalog;