import React from 'react';
import { FiFileText, FiMessageSquare, FiTag, FiEye } from 'react-icons/fi';
import type { BlogPost, Comment } from '../../types';

interface DashboardProps {
  posts: BlogPost[];
  comments: Comment[];
  categories: number;
}

const Dashboard: React.FC<DashboardProps> = ({ posts, comments, categories }) => {
  const stats = [
    {
      title: 'Total de Posts',
      value: posts.length,
      icon: FiFileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Posts Publicados',
      value: posts.filter(p => p.published).length,
      icon: FiFileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Comentários',
      value: comments.length,
      icon: FiMessageSquare,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Categorias',
      value: categories,
      icon: FiTag,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Visualizações Totais',
      value: posts.reduce((acc, p) => acc + p.views, 0),
      icon: FiEye,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
    },
  ];

  const recentPosts = posts.slice(0, 5).sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bem-vindo ao painel administrativo do seu blog!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Posts Recentes</h2>
        {recentPosts.length > 0 ? (
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-sm text-gray-600">Visualizações</p>
                    <p className="font-semibold text-gray-900">{post.views}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum post encontrado</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Taxa de Publicação</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Publicados</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round((posts.filter(p => p.published).length / posts.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(posts.filter(p => p.published).length / posts.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Informações do Sistema</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">Versão:</span> 1.0.0
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Última atualização:</span>{' '}
              {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span>{' '}
              <span className="text-green-600 font-semibold">Online</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
