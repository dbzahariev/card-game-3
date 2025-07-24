import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



type Card = {
  suit: string;
  rank: string;
  value: number;
}

type Hand = {
  hearts: Card[];
  heartsString: string;
  heartsCount: number;
  diamonds: Card[];
  diamondsString: string;
  diamondsCount: number;
  clubs: Card[];
  clubsString: string;
  clubsCount: number;
  spades: Card[];
  spadesString: string;
  spadesCount: number;
}

type FormatedHand = {
  heartsString: string;
  heartsCount: number;
  diamondsString: string;
  diamondsCount: number;
  clubsString: string;
  clubsCount: number;
  spadesString: string;
  spadesCount: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected title = 'card-game-3';

  public suits = [
    { suit: 'spades', symbol: '♠' },
    { suit: 'hearts', symbol: '♥' },
    { suit: 'diamonds', symbol: '♦' },
    { suit: 'clubs', symbol: '♣' }
  ];

  public rankValueCards = [
    { rank: "A", value: 14 },
    { rank: "K", value: 13 },
    { rank: "Q", value: 12 },
    { rank: "J", value: 11 },
    { rank: "10", value: 10 },
    { rank: "9", value: 9 },
    { rank: "8", value: 8 },
    { rank: "7", value: 7 },
    { rank: "6", value: 6 },
    { rank: "5", value: 5 },
    { rank: "4", value: 4 },
    { rank: "3", value: 3 },
    { rank: "2", value: 2 },
  ];


  public cards: Card[] = [
    { suit: this.suits[0].symbol, rank: this.rankValueCards[0].rank, value: this.rankValueCards[0].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[1].rank, value: this.rankValueCards[1].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[2].rank, value: this.rankValueCards[2].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[3].rank, value: this.rankValueCards[3].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[4].rank, value: this.rankValueCards[4].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[5].rank, value: this.rankValueCards[5].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[6].rank, value: this.rankValueCards[6].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[7].rank, value: this.rankValueCards[7].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[8].rank, value: this.rankValueCards[8].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[9].rank, value: this.rankValueCards[9].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[10].rank, value: this.rankValueCards[10].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[11].rank, value: this.rankValueCards[11].value },
    { suit: this.suits[0].symbol, rank: this.rankValueCards[12].rank, value: this.rankValueCards[12].value },

    { suit: this.suits[1].symbol, rank: this.rankValueCards[0].rank, value: this.rankValueCards[0].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[1].rank, value: this.rankValueCards[1].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[2].rank, value: this.rankValueCards[2].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[3].rank, value: this.rankValueCards[3].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[4].rank, value: this.rankValueCards[4].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[5].rank, value: this.rankValueCards[5].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[6].rank, value: this.rankValueCards[6].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[7].rank, value: this.rankValueCards[7].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[8].rank, value: this.rankValueCards[8].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[9].rank, value: this.rankValueCards[9].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[10].rank, value: this.rankValueCards[10].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[11].rank, value: this.rankValueCards[11].value },
    { suit: this.suits[1].symbol, rank: this.rankValueCards[12].rank, value: this.rankValueCards[12].value },

    { suit: this.suits[2].symbol, rank: this.rankValueCards[0].rank, value: this.rankValueCards[0].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[1].rank, value: this.rankValueCards[1].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[2].rank, value: this.rankValueCards[2].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[3].rank, value: this.rankValueCards[3].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[4].rank, value: this.rankValueCards[4].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[5].rank, value: this.rankValueCards[5].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[6].rank, value: this.rankValueCards[6].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[7].rank, value: this.rankValueCards[7].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[8].rank, value: this.rankValueCards[8].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[9].rank, value: this.rankValueCards[9].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[10].rank, value: this.rankValueCards[10].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[11].rank, value: this.rankValueCards[11].value },
    { suit: this.suits[2].symbol, rank: this.rankValueCards[12].rank, value: this.rankValueCards[12].value },

    { suit: this.suits[3].symbol, rank: this.rankValueCards[0].rank, value: this.rankValueCards[0].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[1].rank, value: this.rankValueCards[1].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[2].rank, value: this.rankValueCards[2].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[3].rank, value: this.rankValueCards[3].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[4].rank, value: this.rankValueCards[4].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[5].rank, value: this.rankValueCards[5].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[6].rank, value: this.rankValueCards[6].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[7].rank, value: this.rankValueCards[7].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[8].rank, value: this.rankValueCards[8].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[9].rank, value: this.rankValueCards[9].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[10].rank, value: this.rankValueCards[10].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[11].rank, value: this.rankValueCards[11].value },
    { suit: this.suits[3].symbol, rank: this.rankValueCards[12].rank, value: this.rankValueCards[12].value }
  ];

  constructor() {
    this.writeNumbersToFile();
  }

  private writeNumbersToFile() {
    import('fs').then(fs => {
      let formatedHand1 = this.getOneHand();
      let formatedHand2 = this.getOneHand();
      let formatedHand3 = this.getOneHand();
      let formatedHand4 = this.getOneHand();

      let countT = 8;
      let firstFormatedHand = this.generateIndentedHand(countT, formatedHand1);
      let secondFormatedHand = this.formatTwoHandsAligned(formatedHand2, formatedHand3, (countT + 2) * 5);
      let thirdFormatedHand = this.generateIndentedHand(countT, formatedHand4);

      let full = `${firstFormatedHand}\n${secondFormatedHand}\n${thirdFormatedHand}`

      fs.writeFileSync('C:/Projects/card-game-3/gen-cards/hand one.txt', full, 'utf8');
    }).catch(err => {
      console.error('FS module not available:', err);
    });
  }

  public getOneHand(): Hand {
    let selectedCards: Card[] = [];
    do {
      const card = this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0];
      if (card) {
        selectedCards.push(card);
      }
    } while (selectedCards.length !== 13);

    let spades = selectedCards.filter(card => card.suit === this.suits[3].symbol);
    let hearts = selectedCards.filter(card => card.suit === this.suits[0].symbol);
    let diamonds = selectedCards.filter(card => card.suit === this.suits[1].symbol);
    let clubs = selectedCards.filter(card => card.suit === this.suits[2].symbol);



    let heartsString = this.suits[0].symbol + ' ' + hearts.sort((a, b) => b.value - a.value).map(card => card.rank).join('');
    let diamondsString = this.suits[1].symbol + ' ' + diamonds.sort((a, b) => b.value - a.value).map(card => card.rank).join('');
    let clubsString = this.suits[2].symbol + ' ' + clubs.sort((a, b) => b.value - a.value).map(card => card.rank).join('');
    let spadesString = this.suits[3].symbol + ' ' + spades.sort((a, b) => b.value - a.value).map(card => card.rank).join('');

    return {
      hearts, heartsString, heartsCount: hearts.length,
      diamonds, diamondsString, diamondsCount: diamonds.length,
      clubs, clubsString, clubsCount: clubs.length,
      spades, spadesString, spadesCount: spades.length
    };
  }

  public generateIndentedHand(countT: number, formatedHand1: FormatedHand) {
    let arr = Array.from({ length: countT }, (_, i) => i).map((el => { return "    "; })).join('');
    return `${arr}${formatedHand1.heartsString}\n${arr}${formatedHand1.diamondsString}\n${arr}${formatedHand1.clubsString}\n${arr}${formatedHand1.spadesString}`
  }


  public formatTwoHandsAligned(formatedHand1: FormatedHand, formatedHand2: FormatedHand, gap: number): string {
    const visualLength = (str: string): number => {
      return Array.from(str).reduce((sum) => sum + 1, 0);
    }

    let trimmedLeftRows = [
      formatedHand1.heartsString,
      formatedHand1.diamondsString,
      formatedHand1.clubsString,
      formatedHand1.spadesString
    ].map(r => r.trim());
    const trimmedRightRows = [
      formatedHand2.heartsString,
      formatedHand2.diamondsString,
      formatedHand2.clubsString,
      formatedHand2.spadesString
    ].map(r => r.trim());
    const maxLeft = Math.max(...trimmedLeftRows.map(r => visualLength(r)));

    let formattedCardRows = trimmedLeftRows.map((left, i) => {
      const right = trimmedRightRows[i] || '';
      const visualPad = maxLeft - visualLength(left) + gap;
      return left + ' '.repeat(visualPad) + right;
    }).join('\n');
    return formattedCardRows;
  }
}
