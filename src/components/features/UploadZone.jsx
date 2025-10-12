import React, { useState, useRef } from 'react';
import { Upload, Camera, FileText, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

const UploadZone = ({ onFileSelect, isLoading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFile = (file) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, or PDF file');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          url: reader.result,
          name: file.name,
          size: file.size,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreview({
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
    
    onFileSelect(file);
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  if (preview) {
    return (
      <div className="w-full">
        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6">
          {preview.url ? (
            <div className="mb-4">
              <img 
                src={preview.url} 
                alt="Preview" 
                className="w-full h-64 object-contain rounded-lg bg-slate-900"
              />
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-center h-32 bg-slate-900 rounded-lg">
              <FileText className="w-16 h-16 text-slate-600" />
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium truncate max-w-xs">
                  {preview.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {formatFileSize(preview.size)}
                </p>
              </div>
            </div>
            
            <button
              onClick={clearPreview}
              disabled={isLoading}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-indigo-400 mb-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Processing schedule...</span>
            </div>
          )}
          
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-full" />
          </div>
          <p className="text-sm text-green-400 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Uploaded successfully
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-indigo-500 bg-indigo-500/10 scale-105' 
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          onChange={handleChange}
        />
        
        <input
          ref={cameraInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleChange}
        />
        
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Upload Your Schedule
          </h3>
          <p className="text-slate-400">
            Drag and drop your UAIC schedule here, or click to browse
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="md"
            icon={Camera}
            onClick={(e) => {
              e.stopPropagation();
              cameraInputRef.current?.click();
            }}
          >
            Take Photo
          </Button>
          
          <Button
            variant="secondary"
            size="md"
            icon={FileText}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse Files
          </Button>
        </div>
        
        <p className="text-xs text-slate-500 mt-6">
          Supports JPG, PNG, PDF • Max 10MB
        </p>
      </div>
    </div>
  );
};

export default UploadZone;
export { UploadZone };