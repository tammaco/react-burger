import loadingImg from '../images/loading.gif';

interface ILoadingProps {
    isLoading: boolean;
    isError?: boolean;
}

export function Loading({ isLoading = true, isError = false } : ILoadingProps) : React.JSX.Element {
    return (
        <div className="loading_img_wrapper">
            {isLoading && <> <p className="text text_type_main-default">Немного терпения...</p>
                <img src={loadingImg} alt="Загрузка..."></img></>}
            {isError && <p className="text text_type_main-default">Что-то пошло не так... Попробуйте ещё разок!</p>}
        </div>)
}