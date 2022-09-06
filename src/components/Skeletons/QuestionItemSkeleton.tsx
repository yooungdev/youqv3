import ContentLoader from "react-content-loader"



const QuetionItemSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width='100%'
            style={{ marginTop: '10px' }}
            viewBox="0 0 340 84"
            backgroundColor="#ededed"
            foregroundColor="#dad7d7"
            
        >
            <rect x="35" y="5" rx="5" ry="5" width="100px" height="10" />
            <circle cx="15" cy="18" r="13" />
            <rect x="35" y="20" rx="5" ry="5" width="60px" height="10" />
            <rect x="0" y="40" rx="5" ry="5" width="100%" height="45" />
        </ContentLoader>
    )
}


export default QuetionItemSkeleton