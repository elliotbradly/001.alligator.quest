'use client'

import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import React from 'react'

import { CreatePlayer } from "../../actions/create-player"

var once = false

var preview = 'preview'

function PostForm() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });


  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  var valuesSubmitted = async (values) => {

    var bit = await CreatePlayer(values)
    preview = JSON.stringify(bit)
    
  }


  return (
    <div>

      <div>
        {preview}
      </div>

      <form onSubmit={form.onSubmit(valuesSubmitted)}>
        <TextInput
          {...form.getInputProps('name')}
          key={form.key('name')}
          label="Name"
          placeholder="Name"
        />
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          mt="md"
          label="Email"
          placeholder="Email"
        />
        <Button type="submit" mt="md">
          Submit
        </Button>

        <Text mt="md">Form values:</Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>

        <Text mt="md">Submitted values:</Text>
        <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
      </form>

    </div>
  )
}

export default PostForm
