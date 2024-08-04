import { View, Text } from 'react-native'
import React from 'react'
import Community from '../../screens/Community'

const AllPosts = ({ navigation }) => {
  return (
    <>
      <Community navigation={navigation} isAdmin={true} />
    </>
  )
}

export default AllPosts