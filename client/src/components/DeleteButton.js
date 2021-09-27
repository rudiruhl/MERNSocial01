import React, {useState} from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';


import { Button, Confirm, Icon } from 'semantic-ui-react';


function DeleteButton({ postId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            setConfirmOpen(false);
            // TODO: remove post from cache
        },
        variables: { 
            postId
        }
    })

    return (
        <>
        <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
            <Icon name='trash' style={{ margin: 0 }} />
        </Button>
        <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePost}
        />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;