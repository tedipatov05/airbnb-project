export default function PlaceImg({ place, index = 0, className = null }) {

    if (!place.photos.length) {
        return '';
    }

    if (!className) {
        className = 'object-cover';
    }

    let url = '';

    if (place.photos[0].includes('http')) {
        url = place.photos[0]
    } else {
        url = 'http://localhost:4000/uploads/' + place.photos[0]
    }

    return (
        <img className={className} src={url} alt="" />
    );
}