const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '636bd96ee74dc02456c15c89a509c2f2',
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original/${imagePath}`,
    w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`
}

export default apiConfig