interface IPost {
    id: string;
    title: string;
}

const Home = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Failed to fetch data.');

    const posts = await response.json();

    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols'}>
            {posts.map((post: IPost) => (
                <div key={post.id} className={'bg-black shadow-md rounded-lg p-4 transition t...'}>
                    <h3 className={'text-lg font-bold mb-2'}>{post.title}</h3>
                    <p className={'text-gray-600'}>Album ID: {post.id}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
