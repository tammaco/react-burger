import loadingImg from '../images/loading.gif';

export function Loading() {
    return (
        <div className="loading_img_wrapper">
            <p className="text text_type_main-default">Немного терпения...</p>
            <img src={loadingImg} alt="Загрузка..."></img>
        </div>
    )
}