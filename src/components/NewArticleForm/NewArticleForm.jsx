import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { setArticle } from '../../redux/articles/articlesActions'
import { prepareArticleObject } from '../../helpers/prepareArticleObject'
import { ArticleValidation } from '../../schema/validation'
import FormikInput from '../FormikInput/FormikInput'
import FormikTextarea from '../FormikTextarea/FormikTextarea'

function NewArticleForm({ dispatchSetArticle }) {
  const navigate = useNavigate()

  const handleSubmit = ({ title, text }) => {
    const newArticle = prepareArticleObject(title, text)

    dispatchSetArticle(newArticle).then(() => {
      navigate('/admin/articles')
    })
  }

  return (
    <Formik
      initialValues={{
        title: '',
        text: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={ArticleValidation}
    >
      {() => (
        <Form className="basic-form">
          <FormikInput name="title" label="Title" type="text" />
          <FormikTextarea name="text" label="Text" type="textarea" />
          <button className="basic-form__btn" type="submit">
            Create article
          </button>
        </Form>
      )}
    </Formik>
  )
}

NewArticleForm.propTypes = {
  dispatchSetArticle: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetArticle: (article) => dispatch(setArticle(article))
})

export default connect(null, mapDispatchToProps)(NewArticleForm)
