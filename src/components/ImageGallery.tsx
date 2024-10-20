export default function ImageGallery({gallery} : {gallery ?: string[]}) {
    if(gallery?.length === 0) return null
  return (
    gallery?.map(elem => (
        <img src={elem} key={elem} alt={elem} />
    ))
  );
}
