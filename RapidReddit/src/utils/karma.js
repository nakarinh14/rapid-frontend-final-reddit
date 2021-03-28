export function calculateKarma(originalUpvote, newUpvote){
    const upvoteWeight = newUpvote ? 1 : -1
    let newKarmaWeight = upvoteWeight

    // For isVoted -> null: not yet voted, true: already upvoted, false: already downvoted
    if(originalUpvote === newUpvote) {
        // If user action apply to already applied karma status, nullified its karma
        // (e.g. Pressing upvote/downvote when comment is already upvoted/downvoted respectively)
        newKarmaWeight *= -1
    } else {
        const currentKarmaWeight = originalUpvote == null ? 0 : -(originalUpvote * 2 - 1)
        newKarmaWeight = upvoteWeight + currentKarmaWeight
    }
    return newKarmaWeight
}
