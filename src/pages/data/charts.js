import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import ChartList from '~components/pages/data/charts/chart-list'

const ChartsPage = ({ data }) => (
  <Layout title="Charts" returnLinks={[{ link: '/data' }]}>
    <ChartList />

    <Container centered>
      <LongContent>
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </LongContent>
    </Container>
  </Layout>
)

export default ChartsPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "chart-page-content" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
