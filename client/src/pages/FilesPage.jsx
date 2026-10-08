import { useEffect, useRef, useState } from 'react'
import { demoFiles } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function FilesPage() {
  const [files, setFiles] = useState(demoFiles)
  const objectUrls = useRef(new Set())
  const { user } = useAuth()

  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return

    const fileUrl = URL.createObjectURL(selectedFile)
    objectUrls.current.add(fileUrl)

    const newFile = {
      id: Date.now(),
      file_name: selectedFile.name,
      file_url: fileUrl,
      uploader: user?.user_metadata?.full_name || user?.email || 'You',
      created_at: new Date().toISOString().slice(0, 10),
    }

    setFiles((currentFiles) => [newFile, ...currentFiles])
    event.target.value = ''
  }

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>Shared Files</h2>
        <label className="primary-btn upload-btn">
          Upload file
          <input type="file" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="table-card panel-card">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploader</th>
              <th>Upload Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.file_name}</td>
                <td>{file.uploader}</td>
                <td>{file.created_at}</td>
                <td className="file-actions">
                  {file.file_url ? (
                    <>
                      <a href={file.file_url} className="link-btn" target="_blank" rel="noreferrer">
                        Open
                      </a>
                      <a href={file.file_url} className="link-btn" download={file.file_name}>
                        Download
                      </a>
                    </>
                  ) : (
                    <span className="file-unavailable">Sample metadata only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
