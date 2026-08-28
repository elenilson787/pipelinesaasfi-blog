import React, { useState } from 'react';
import { FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import type { Comment } from '../../types';
import { storageService } from '../../lib/storage';

interface CommentsProps {
  onCommentUpdate: () => void;
}

const Comments: React.FC<CommentsProps> = ({ onCommentUpdate }) => {
  const [comments, setComments] = useState<Comment[]>(storageService.getComments());
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const filteredComments = comments.filter((c) => {
    if (filter === 'approved') return c.approved;
    if (filter === 'pending') return !c.approved;
    return true;
  });

  const handleApprove = (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      storageService.saveComment({ ...comment, approved: true });
      setComments(storageService.getComments());
      onCommentUpdate();
    }
  };

  const handleReject = (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      storageService.saveComment({ ...comment, approved: false });
      setComments(storageService.getComments());
      onCommentUpdate();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este comentário?')) {
      storageService.deleteComment(id);
      setComments(storageService.getComments());
      onCommentUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comentários</h1>
        <p className="text-gray-600 mt-2">Gerencie os comentários do seu blog</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'approved', 'pending'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {f === 'all' && 'Todos'}
            {f === 'approved' && 'Aprovados'}
            {f === 'pending' && 'Pendentes'}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                comment.approved ? 'border-green-500' : 'border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{comment.author}</h3>
                  <p className="text-sm text-gray-600">{comment.email}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  comment.approved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {comment.approved ? 'Aprovado' : 'Pendente'}
                </span>
              </div>

              <p className="text-gray-700 my-3">{comment.content}</p>

              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-600">
                  {new Date(comment.createdAt).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(comment.createdAt).toLocaleTimeString('pt-BR')}
                </p>

                <div className="flex gap-2">
                  {!comment.approved && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      <FiCheck size={16} /> Aprovar
                    </button>
                  )}
                  {comment.approved && (
                    <button
                      onClick={() => handleReject(comment.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
                    >
                      <FiX size={16} /> Reprovar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    <FiTrash2 size={16} /> Deletar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">Nenhum comentário encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
