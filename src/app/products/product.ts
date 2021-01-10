export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}

// Implement interface with class
// export class Product implements IProduct {
//     constructor(public productId: number,
//                 public productName: string,
//                 public productCode: string,
//                 public releaseDate: string,
//                 public description: string,
//                 public price: number,
//                 public starRating: number,
//                 public imageUrl: string) {        
//     }

//     calculateDiscount(percent: number): number {
//         return this.price - (this.price * percent / 100)
//     }
// }
