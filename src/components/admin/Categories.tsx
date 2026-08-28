import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Category } from '../../types';
import { storageService } from '../../lib/storage';

interface CategoriesProps {
  onCategoryUpdate: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryUpdate }) => {
  const [categories, setCategories] = useState<Category[]>(storageService.getCategories());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Preencha o nome da categoria');
      return;
    }

    const newCategory: Category = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description || '',
    };

    storageService.saveCategory(newCategory);
    setCategories(storageService.getCategories());
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
    onCategoryUpdate();
  };

  const handleEdit = (category: Category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      storageService.deleteCategory(id);
      setCategories(storageService.getCategories());
      onCategoryUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', description: '' });
          }}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus /> Nova Categoria
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {editingId ? 'Atualizar' : 'Criar'} Categoria
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{category.description}</p>
              <p className="text-xs text-gray-500 mt-3">Slug: {category.slug}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">Nenhuma categoria criada ainda.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Criar primeira categoria
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
