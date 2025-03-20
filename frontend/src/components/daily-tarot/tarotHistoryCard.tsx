import Image from "next/image";
import Link from "next/link";

interface tarotHistoryCardProp {
  cardId: string;
  cardName: string;
  cardImage: string;
  cardDescription: string;
  cardDate: string;
}

const TarotHistoryCard: React.FC<tarotHistoryCardProp> = ({cardId,cardName, cardDate, cardImage, cardDescription}) => {
  return (
    <div className="flex flex-row bg-white w-full max-w-md p-2 rounded-xl">
      <Image src={cardImage} alt={cardName} width={100} height={100} className="h-full border border-1 border-jet rounded-lg aspect-tarot-card" />
      <div className="flex flex-col justify-between ml-4 px-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-fredericka-the-great font-semibold">{cardName}</h3>
          <p className="text-xs text-athiti">{cardDate.split('-').join('/')}</p>
          <p className="text-xs line-clamp-2 text-wrap">{cardDescription}</p>
        </div>
        <Link href={`/homepage/daily-tarot/history/${cardId}`} className="text-xs text-right w-full text-gray-500">Read more...</Link>
      </div>
    </div>
  )
}

export default TarotHistoryCard;