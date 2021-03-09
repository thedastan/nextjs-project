import React from 'react'
import Router from 'next/router'
import {MainLayout} from '../../components/MainLayout'

export default function About({ title }) {
    const linkClickHandler = () => {
        Router.push('/')
    }
    return (
        <MainLayout title={'About Page'}>
            <h1>{title}</h1>

            <button onClick={linkClickHandler}>Go back to Home </button>
            <button onClick={() => Router.push('/posts')}>Go to Posts</button>
        </MainLayout>
    )
}

About.getInitialProps = async () => {
    const response = await fetch(`${process.env.API_URL}/about`)
    const data = await response.json()

    return {
        title: data.title
    }
}