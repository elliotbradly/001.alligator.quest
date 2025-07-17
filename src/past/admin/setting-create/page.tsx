"use client"

import { MantineProvider, createTheme, Paper, Box, Center, ScrollArea, Button, Divider } from '@mantine/core'
import '@mantine/core/styles.css'

import { useState } from 'react'

import { loadProse } from '../../../../core/277.okwierdo';
import { saveProse } from '../../../../core/277.okwierdo';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, useRichTextEditorContext, Link } from '@mantine/tiptap';
import { IconStar } from '@tabler/icons-react';

import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';



const theme = createTheme({
  fontFamily: 'Courier, monospace'
})

var dex = 0;


function InsertStarControl() {
  
  
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.insertContent('⭐')}
      aria-label="Insert star emoji"
      title="Insert star emoji"
    >
      <IconStar stroke={1.5} size="1rem" />
    </RichTextEditor.Control>
  );
}


export default function Page() {




  const [data, setData] = useState('----')


  let action = async () => {

    //var bit = await updateFictiq(3)
    //setData(JSON.stringify(bit))
  }

  
  const load = async ()=>{


    var dat = await loadProse()
  
    //setData(JSON.stringify(bit))
    
    editor.commands.setContent(  dat )

  }

  const save = async ()=>{

    var itm = editor.getHTML()
    var dat = await saveProse( itm)
    
  }
  


  //<UseInitFictiq />

  const editor = useEditor({
    editable: true,
    content: {data},
    immediatelyRender:false,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
      ]
  });


  return (
    <MantineProvider theme={theme}>

<ScrollArea className='h-screen w-full' scrollbars="y">
                        



<Center className='h-screen w-full' bg="var(--mantine-color-gray-light)">
        <Box bg="var(--mantine-color-blue-light)">
        
        <Button onClick={load} color='grape' fullWidth size='xl' variant="outline">LOAD</Button>
        <Button onClick={save} color='grape' fullWidth size='xl' variant="filled">SAVE</Button>



          <Paper className="w-[612px] h-[792px] flex items-center justify-center" shadow="md">
            





          <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>



          </Paper>

          <Divider></Divider>
        </Box>
      </Center>

                    </ScrollArea>

      


  

    </MantineProvider>
  )
}