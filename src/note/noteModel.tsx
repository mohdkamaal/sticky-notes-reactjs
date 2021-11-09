export class Note { 
    static defaultState() {
        return {
          id: Number,
          title: String,
          createdAt: Date,
          isStar: Boolean,
          bgColor: String
        };
      }
 }