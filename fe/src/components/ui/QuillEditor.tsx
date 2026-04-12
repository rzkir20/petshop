import ReactQuill from 'react-quill-new'

import 'react-quill-new/dist/quill.snow.css'

import { cn } from '#/lib/utils'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
}

export function QuillEditor({
  value,
  onChange,
  placeholder = 'Tulis konten produk...',
  className,
}: QuillEditorProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-emerald-100',
        className,
      )}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  )
}
