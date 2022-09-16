import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { editArticle } from '../../redux/articles/articlesActions'
import { ArticleValidation } from '../../schema/validation'
import FormikInput from '../FormikInput/FormikInput'
import FormikTextarea from '../FormikTextarea/FormikTextarea'

function EditArticleForm({ dispatchEditArticle, article }) {
  const navigate = useNavigate()

  const handleSubmit = ({ title, text }) => {
    dispatchEditArticle({ ...article, title, text }).then(() => {
      navigate('/admin/articles')
    })
  }

  return (
    <Formik
      initialValues={{
        title: article.title,
        text: article.text
      }}
      onSubmit={handleSubmit}
      validationSchema={ArticleValidation}
    >
      {() => (
        <Form className="basic-form">
          <FormikInput name="title" label="Title" type="text" />
          <FormikTextarea name="text" label="Text" type="textarea" />
          <button className="basic-form__btn" type="submit">
            Edit article
          </button>
        </Form>
      )}
    </Formik>
  )
}

EditArticleForm.propTypes = {
  dispatchEditArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.number
  }).isRequired
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEditArticle: (article) => dispatch(editArticle(article))
})

export default connect(null, mapDispatchToProps)(EditArticleForm)
