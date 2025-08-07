import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



type Card = {
  suit: string;
  rank: string;
  value: number;
  realValue: number;
}

type Hand = {
  spades: Card[];
  spadesString: string;
  spadesCount: number;
  hearts: Card[];
  heartsString: string;
  heartsCount: number;
  diamonds: Card[];
  diamondsString: string;
  diamondsCount: number;
  clubs: Card[];
  clubsString: string;
  clubsCount: number;
  allCards: Card[];
  points: number;
}

type FormatedHand = {
  spadesString: string;
  spadesCount: number;
  heartsString: string;
  heartsCount: number;
  diamondsString: string;
  diamondsCount: number;
  clubsString: string;
  clubsCount: number;
  points: number;
}

type Limits = {
  spades?: { min?: number, max?: number, full?: string[] },
  hearts?: { min?: number, max?: number, full?: string[] },
  diamonds?: { min?: number, max?: number, full?: string[] },
  clubs?: { min?: number, max?: number, full?: string[] },
  points?: { min?: number, max?: number, full?: string[] },
}

type Table = {
  formatedHand1: Hand;
  formatedHand2: Hand;
  formatedHand3: Hand;
  formatedHand4: Hand;
  firstRow: string;
  secondRow: string;
  thirdRow: string;
  fullRow: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected title = 'card-game-3';

  public listTables: Table[] = [];

  public suits = [
    { suit: 'spades', symbol: '♠' },
    { suit: 'hearts', symbol: '♥' },
    { suit: 'diamonds', symbol: '♦' },
    { suit: 'clubs', symbol: '♣' },
    { suit: 'points', symbol: '•' }
  ];

  public rankValueCards = [
    { rank: "A", value: 14, realValue: 4 },
    { rank: "K", value: 13, realValue: 3 },
    { rank: "Q", value: 12, realValue: 2 },
    { rank: "J", value: 11, realValue: 1 },
    { rank: "10", value: 10, realValue: 0 },
    { rank: "9", value: 9, realValue: 0 },
    { rank: "8", value: 8, realValue: 0 },
    { rank: "7", value: 7, realValue: 0 },
    { rank: "6", value: 6, realValue: 0 },
    { rank: "5", value: 5, realValue: 0 },
    { rank: "4", value: 4, realValue: 0 },
    { rank: "3", value: 3, realValue: 0 },
    { rank: "2", value: 2, realValue: 0 },
  ];


  public cards: Card[] = [];

  constructor() {
    this.generateCardList();
    this.writeNumbersToFile();
  }

  private generateCardList() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        this.cards.push({ suit: this.suits[i].symbol, rank: this.rankValueCards[j].rank, value: this.rankValueCards[j].value, realValue: this.rankValueCards[j].realValue });
      }
    }
  }

  private validWithLimit(
    limitedHand: Hand,
    limit: Limits,
    limitedFull: { spades: Card[], hearts: Card[], diamonds: Card[], clubs: Card[] }
  ): boolean {
    // If no limits or no full cards specified, always valid
    if (Object.keys(limit).length === 0 ||
      Object.values(limitedFull).every(arr => arr.length === 0)) {
      return true;
    }

    // Helper to check suit validity
    const checkSuit = (suit: keyof typeof limitedFull, count: number): boolean => {
      const required = limitedFull[suit].length;
      if (required === 0) return true;
      return count >= required;
    };

    const validSpades = checkSuit('spades', limitedHand.spadesCount);
    const validHearts = checkSuit('hearts', limitedHand.heartsCount);
    const validDiamonds = checkSuit('diamonds', limitedHand.diamondsCount);
    const validClubs = checkSuit('clubs', limitedHand.clubsCount);

    return validSpades && validHearts && validDiamonds && validClubs;
  }

  private validateWithEquals(
    limitedHand: Hand,
    limit: Limits,
    limitedFull: { spades: Card[], hearts: Card[], diamonds: Card[], clubs: Card[] }
  ): boolean {
    if (
      Object.keys(limit).length === 0 ||
      Object.values(limitedFull).every(arr => arr.length === 0)
    ) {
      return true;
    }

    const suits: (keyof typeof limitedFull)[] = ['spades', 'hearts', 'diamonds', 'clubs'];
    return suits.every(suit => {
      const requiredCards = limitedFull[suit];
      if (requiredCards.length === 0) return true;
      const handCards = limitedHand[suit];
      const matchedCount = requiredCards.filter(reqCard =>
        handCards.some(card => card.rank === reqCard.rank)
      ).length;
      return matchedCount === requiredCards.length;
    });
  }

  private getHandByValidation(limit: Limits) {
    let limitedFull: { spades: Card[], hearts: Card[], diamonds: Card[], clubs: Card[] } = { spades: [], hearts: [], diamonds: [], clubs: [] };
    Object.entries(limit).forEach(([suit, value]) => {
      if (value?.full) {
        value.full.forEach((el) => {
          let card = this.cards.filter(card => card.suit === this.suits[0].symbol && card.rank === el)[0];
          if (suit === 'spades' || suit === 'hearts' || suit === 'diamonds' || suit === 'clubs') {
            limitedFull[suit].push(card);
          }
        })
      }
    })
    let limitedHand: Hand = this.getOneHand();
    let suitLimits = (this.suits.map(suit => suit.suit) as (keyof Limits)[]).filter(suit => limit[suit]?.min !== undefined && limit[suit]?.max !== undefined);
    let attempts = 0;
    const limitAttempts = 100000 / 3;
    while (attempts < limitAttempts) {
      if (this.validWithLimit(limitedHand, limit, limitedFull)) {
        break;
      }
      limitedHand = this.getOneHand();
      attempts++;
    }
    attempts = 0;

    while (attempts < limitAttempts) {
      if (this.validateWithEquals(limitedHand, limit, limitedFull)) {
        break;
      }
      limitedHand = this.getOneHand();
      attempts++;
    }
    attempts = 0;

    if (suitLimits.length > 0) {
      while (
        suitLimits.some(suit => {
          const countKey = `${suit}Count` as keyof Hand;
          if (countKey in limitedHand) {
            return (
              (limitedHand[countKey] as number) < (limit[suit]?.min ?? 0) ||
              (limitedHand[countKey] as number) > (limit[suit]?.max ?? Number.POSITIVE_INFINITY)
            );
          }
          else if (suit === 'points') {
            let limitHandPoint = limitedHand.points;
            return (
              limitHandPoint < (limit[suit]?.min ?? 0) ||
              limitHandPoint > (limit[suit]?.max ?? Number.POSITIVE_INFINITY)
            );
          }
          return false;
        })
        && attempts < limitAttempts
      ) {
        limitedHand = this.getOneHand();
        attempts++;
      }
    }
    limitedHand.allCards.forEach((element) => { this.cards.splice(this.cards.findIndex(card => card.rank === element.rank && card.suit === element.suit), 1); });

    if (attempts === limitAttempts) {
      limitedHand.hearts = []
      limitedHand.heartsCount = 0;
      limitedHand.heartsString = limitedHand.heartsString.slice(0, 2);
      limitedHand.diamonds = []
      limitedHand.diamondsCount = 0;
      limitedHand.diamondsString = limitedHand.diamondsString.slice(0, 2);
      limitedHand.clubs = []
      limitedHand.clubsCount = 0;
      limitedHand.clubsString = limitedHand.clubsString.slice(0, 2);
      limitedHand.spades = []
      limitedHand.spadesCount = 0;
      limitedHand.spadesString = limitedHand.spadesString.slice(0, 2);
      limitedHand.allCards.forEach((el) => {
        this.cards.push(el);
      });
      limitedHand.allCards = [];
      limitedHand.points = 0;
    }
    return limitedHand;
  }

  private separateLimitsFromString(str: string) {
    const fullLimits: { [key: string]: Limits } = {};
    let heartsPatern = /(?<key>h[1-4]): (?<som>.+?);/gu;
    for (const match of str.matchAll(heartsPatern)) {
      let { key, som } = match.groups ?? {};
      for (const elFromSomthing of som.split(', ')) {
        let [suit, minMax] = elFromSomthing.split(': ');
        if (!fullLimits[key]) {
          fullLimits[key] = {};
        }
        if (minMax.includes('-')) {
          let [min, max] = minMax.split('-');
          if (key && suit && min && max) {
            fullLimits[key][suit as keyof Limits] = { min: parseInt(min, 10), max: parseInt(max, 10) };
          }
        } else {
          fullLimits[key][suit as keyof Limits] = { full: this.splitWithTen(minMax) };
        }
      }
    }
    return fullLimits;
  }

  private splitWithTen(input: string): string[] {
    const result = [];
    result.push(input[0]);
    const digits = input.slice(1);
    for (let i = 0; i < digits.length; i++) {
      if (digits[i] === '1' && digits[i + 1] === '0') {
        result.push('10');
        i++;
      } else {
        result.push(digits[i]);
      }
    }
    return result;
  }


  private genTable(tableLimit: string, tableName: string): Table {
    let generatedTableLimit = this.separateLimitsFromString(tableLimit);
    let fullLimit: { h1: Limits, h2: Limits, h3: Limits, h4: Limits } = { h1: {}, h2: {}, h3: {}, h4: {} };
    Object.entries(generatedTableLimit).forEach(([key, value]) => {
      if (key === 'h1') {
        fullLimit.h1 = value;
      } else if (key === 'h2') {
        fullLimit.h2 = value;
      } else if (key === 'h3') {
        fullLimit.h3 = value;
      } else if (key === 'h4') {
        fullLimit.h4 = value;
      }
    });

    let formatedHand1 = this.getHandByValidation(fullLimit.h1);
    let formatedHand2 = this.getHandByValidation(fullLimit.h2);
    let formatedHand3 = this.getHandByValidation(fullLimit.h3);
    let formatedHand4 = this.getHandByValidation(fullLimit.h4);



    const countT = 5;
    let firstRow = this.generateIndentedHand(countT, formatedHand1, 'North', tableName);
    let secondRow = this.formatTwoHandsAligned(formatedHand2, formatedHand3, (countT + 2) * 5, 'West', 'East');
    let thirdRow = this.generateIndentedHand(countT, formatedHand4, 'South');
    let full = `${firstRow}\n${secondRow}\n${thirdRow}`;

    this.cards.push(...formatedHand1.allCards, ...formatedHand2.allCards, ...formatedHand3.allCards, ...formatedHand4.allCards);

    let result: Table = {
      formatedHand1,
      formatedHand2,
      formatedHand3,
      formatedHand4,
      firstRow,
      secondRow,
      thirdRow,
      fullRow: full
    };

    return result;
  }

  private writeNumbersToFile() {
    import('fs').then(fs => {
      let filterStringT1H1 = `h1: spades: K10953; h2: points: 0-10; h3: hearts: 4-4, clubs: 2-2;`;
      for (let i = 1; i <= 10; i++) {
        this.listTables.push(this.genTable(i === 1 ? filterStringT1H1 : '', `Table ${i}:`));
      }

      let full = this.listTables.map(table => table.fullRow).join('\n\n\n\n\n\n\n\n\n\n');
      fs.writeFileSync('C:/Projects/card-game-3/gen-cards/hand one.txt', full, 'utf8');
    }).catch(err => {
      console.error('FS module not available:', err);
    });
  }

  public getOneHand(): Hand {
    let selectedCards: Card[] = [];
    let card: Card;
    do {
      card = this.cards[Math.floor(Math.random() * this.cards.length)];
      if (card) {
        selectedCards.push(card);
      }
      if (selectedCards.filter(c => c.rank === card.rank && c.suit === card.suit).length !== 1) {
        selectedCards.splice(selectedCards.findIndex(c => c.rank === card.rank && c.suit === card.suit), 1);
      }
    } while (selectedCards.length !== 13 && selectedCards.filter(c => c.rank === card.rank && c.suit === card.suit).length === 1);

    let spades = selectedCards.filter(card => card.suit === this.suits[3].symbol);
    let hearts = selectedCards.filter(card => card.suit === this.suits[0].symbol);
    let diamonds = selectedCards.filter(card => card.suit === this.suits[1].symbol);
    let clubs = selectedCards.filter(card => card.suit === this.suits[2].symbol);



    let spadesString = this.suits[3].symbol + ' ' + spades.sort((a, b) => b.realValue - a.realValue).map(card => card.rank).join('');
    let heartsString = this.suits[0].symbol + ' ' + hearts.sort((a, b) => b.realValue - a.realValue).map(card => card.rank).join('');
    let diamondsString = this.suits[1].symbol + ' ' + diamonds.sort((a, b) => b.realValue - a.realValue).map(card => card.rank).join('');
    let clubsString = this.suits[2].symbol + ' ' + clubs.sort((a, b) => b.realValue - a.realValue).map(card => card.rank).join('');

    let cardPoints = selectedCards.reduce((sum, card) => sum + card.realValue, 0);
    return {
      spades, spadesString, spadesCount: spades.length,
      hearts, heartsString, heartsCount: hearts.length,
      diamonds, diamondsString, diamondsCount: diamonds.length,
      clubs, clubsString, clubsCount: clubs.length,
      allCards: selectedCards,
      points: cardPoints
    };
  }

  public generateIndentedHand(countT: number, formatedHand1: FormatedHand, handName: string, tableName?: string): string {
    let arr = Array.from({ length: countT }, (_, i) => i).map((el => { return "    "; })).join('');
    let result = ''
    if (tableName) {
      result += tableName + '\n';
    }
    result += `${arr}${handName} (${formatedHand1.points})\n${arr}${formatedHand1.heartsString}\n${arr}${formatedHand1.diamondsString}\n${arr}${formatedHand1.clubsString}\n${arr}${formatedHand1.spadesString}`
    return result;
  }


  public formatTwoHandsAligned(formatedHand1: FormatedHand, formatedHand2: FormatedHand, gap: number, nameC1: string, nameC2: string): string {
    const visualLength = (str: string): number => {
      return Array.from(str).reduce((sum) => sum + 1, 0);
    }
    nameC1 += ` (${formatedHand1.points})`;
    nameC2 += ` (${formatedHand2.points})`;

    let trimmedLeftRows = [
      nameC1,
      formatedHand1.spadesString,
      formatedHand1.heartsString,
      formatedHand1.diamondsString,
      formatedHand1.clubsString,
    ].map(r => r.trim());
    const trimmedRightRows = [
      nameC2,
      formatedHand2.spadesString,
      formatedHand2.heartsString,
      formatedHand2.diamondsString,
      formatedHand2.clubsString,
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
