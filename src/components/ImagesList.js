import {useState, useEffect} from "react";
import {Button, Spinner} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ImagesList = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
        .then(response => response.json())
        .then((result) => {
            setImages(prevImages => [...prevImages, ...result]);
            setLoading(false);
        });
    }, [page]);

    const handleClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <div className="list">
                {images.map(({id, download_url}) => (
                    <div className="list__img"><img src={download_url} key={id} alt="Photo"/></div>
                ))}
            </div>
            {isLoading ? <Spinner animation="border" variant="primary"/> :
                <Button variant="primary" onClick={handleClick} className="list_btn">show more</Button>}
        </>
    );
};

export default ImagesList;