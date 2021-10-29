import loaderstyle from './loader.module.css'

const Loader = () => {
    return (
        <div className={loaderstyle.loader_body}>
            <div className={loaderstyle.loading}></div>
        </div>
    )
}


export default Loader
