import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { stickies } from "./Memo";

interface ArticleProps {
    index: number
}

const Article = (props: ArticleProps) => {
    const sticky = stickies[props.index];
    const date = sticky.createdDate;

    return (
        <>
            <Helmet>
                <title>{sticky.title}</title>
                <meta name="description" content={sticky.category} />
            </Helmet>

            <h2>{sticky.title}</h2>
            <h5>{date.getFullYear()}年{date.getMonth()}月{date.getDate()}日</h5>
            <ReactMarkdown
                children={sticky.body}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={nord as any}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </>
    );
}

export default Article;