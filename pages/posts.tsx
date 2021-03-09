import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from '../components/MainLayout'
import {MyPost} from '../interfaces/post'
import {NextPageContext} from 'next'

interface PostsPageProps {
    posts: MyPost[]
}

export default function Posts({ posts: serverPost }: PostsPageProps) {
    const [posts, setPosts] = useState(serverPost)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts`)
            const json = await response.json()
            setPosts(json)
        }

       if (!serverPost) {
           load()
       }

    }, [])

    if (!posts) {
        return  <MainLayout>
            <p>Loading...</p>
        </MainLayout>
    }
    return (
        <MainLayout>
            <Head>
                <title>Post page | Next Course </title>
            </Head>
            <h1>Posts page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                            <a>{post.title }</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}


Posts.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {posts: null}
    }
    const response = await fetch(`${process.env.API_URL}/posts`)
    const posts: MyPost[] = await response.json()

    return {
        posts
    }
}