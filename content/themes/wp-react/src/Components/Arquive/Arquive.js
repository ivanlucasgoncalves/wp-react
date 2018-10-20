import React from "react";

import Loader from "../TemplateParts/Loader";
import Post from "../Post/Post";
import TopHeader from "../TemplateParts/Blog/TopHeader";

export default class Arquive extends React.Component {
    state = {
        posts: [],
        page: 0,
        isLoading: true
    };
    componentWillUnmount() {
        this.getPosts = null;
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts() {
        this.fetchPosts().then(response => {
            this.setState({
                posts: response,
                page: this.state.page + 1,
                isLoading: false
            });
        });
    }
    fetchPosts = async () => {
        try {
            const response = await fetch(WPReactSettings.URL.api + "/posts");
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error("Request Failed");
        } catch (error) {
            console.log(error);
        }
    };
    render({ isLoading, posts } = this.state) {
        if (isLoading) return <Loader />
        return (
            <main>
                <TopHeader />
                <div className="cntr">
                    <Post posts={posts} />
                </div>
            </main>
        )
    }
}
