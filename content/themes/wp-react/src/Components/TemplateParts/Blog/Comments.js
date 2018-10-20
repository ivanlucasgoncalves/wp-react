import React from "react";

import CommentsList from "./CommentsList";

export default class Comments extends React.Component {
    state = {
        comment: "",
        name: "",
        email: ""
    };
    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.comment || !this.state.name || !this.state.email) {
            console.log("Please fill the form!");
        } else {
            this.postComment();
            event.reset();
        }
    };
    postComment = async () => {
        const { postID } = this.props;
        const { comment, name, email } = this.state;
        try {
            const response = await fetch(
                WPReactSettings.URL.api + "/comments?post=" + postID,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        author_name: name,
                        author_email: email,
                        content: comment
                    })
                }
            );
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error("Request Failed!");
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        const { postID } = this.props;
        return (
            <section className="comments-wrapper">
                <CommentsList postID={postID} />
                <div className="cntr entry-comments">
                    <form
                        className="form-comments"
                        onSubmit={this.handleSubmit}
                    >
                        <h3>
                            <span>Add Comment</span>
                            <svg width="22" height="19" viewBox="0 0 22 19">
                                <path
                                    d="M20.98 7.8c0 3.5-2.87 6.38-6.38 6.38h-2.55l-3.4 3.4v-3.4H7.8c-3.5 0-6.38-2.87-6.38-6.38 0-3.5 2.87-6.38 6.38-6.38h6.8c3.5 0 6.38 2.87 6.38 6.38z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h3>
                        <textarea
                            value={this.state.comment}
                            name="comment"
                            onChange={this.handleInputChange}
                            placeholder="Write a Comment..."
                        />
                        <div className="dual-input">
                            <input
                                type="text"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleInputChange}
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleInputChange}
                                placeholder="Email"
                            />
                        </div>
                        <input
                            className="input-submit"
                            type="submit"
                            value="Post Comment"
                        />
                    </form>
                </div>
            </section>
        );
    }
}
