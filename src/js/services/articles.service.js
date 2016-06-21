export default class Articles {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;

  }

  // Retrieve a single article
  get(slug) {
    let deferred = this._$q.defer();

    // Check for a blank slug
    if (!slug.replace(' ', '')) {
      deferred.reject('Article sug is empty');
      return deferred.promise;
    }
    
    this._$http({
      url: this._AppConstants.api + '/articles/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.article),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  // Creates an article
  save(article) {

    let request = {};

    if (article.slug) {
      // If there is a slug, perform an update via PUT w/ article's slug
      request.url = `${this._AppConstants.api}/articles/${article.slug}`;
      request.method = 'PUT';
      // Delete the slug from the article to ensure that the server updates the slug,
      // which happens if the article of the title is changed
      delete article.slug;

      // Otherwise, this is a new article POST request
    } else {
      request.url = `${this._AppConstants.api}/articles`;
      request.method = 'POST';      
    }

    // Set the article data in the data attribute of our request, same for both
    request.data = { article: article };

    return this._$http(request).then((res) => res.data.article);
  }

  // Delete an article
  destroy(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug,
      method: 'DELETE'
    });
  }

  // Favourite an article
  favourite(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug+ '/favorite',
      method: 'POST'
    });
  }

  // Unfavourite an article
  unfavourite(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug+ '/favorite',
      method: 'DELETE'
    });
  }  

}