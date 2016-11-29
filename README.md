FreeCodeCamp API Basejump: image search abstraction layer Microservice

User stories:

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.

3. I can get a list of the most recently submitted search strings.

Example usage:

search for images
https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10 

browse recent search queries
https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/