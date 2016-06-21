class FavouriteBtnCtrl {
  constructor(Articles, User, $state) {
    'ngInject';

    this._Articles = Articles;
    this._User = User;
    this._$state = $state;

  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    // If favourited already, unfavourite it
    if (this.article.favorited) {
      this._Articles.unfavourite(this.article.slug).then(
        () => {
          this.isSubmitting = false;
          this.article.favorited = false;
          this.article.favoritesCount--;
        }
      )

    // Otherwise, favorite it
    } else {
      this._Articles.favourite(this.article.slug).then(
        () => {
          this.isSubmitting = false;
          this.article.favorited = true;
          this.article.favoritesCount++;
        }
      );
    }
  }
  
}

let FavouriteBtn = {
  bindings: {
    article: '='
  },
  transclude: true,
  controller: FavouriteBtnCtrl,
  templateUrl: 'components/buttons/favourite-btn.html'
};

export default FavouriteBtn;