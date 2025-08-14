import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardList, Send, ArrowLeft } from 'lucide-react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import { dataService } from '../services/dataService';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'text';
  options?: string[];
  required?: boolean;
}

export default function SurveyForm() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const questions: Question[] = useMemo(() => [
    { id: 'q1', text: 'Seberapa sering Anda menggunakan aplikasi Yamaha Member?', type: 'mcq', required: true, options: ['Harian', 'Mingguan', 'Bulanan', 'Jarang'] },
    { id: 'q2', text: 'Fitur mana yang paling Anda butuhkan?', type: 'mcq', required: true, options: ['Penukaran Reward', 'Pencarian Dealer', 'Riwayat Service', 'Event Komunitas'] },
    { id: 'q3', text: 'Menurut Anda, kemudahan navigasi aplikasi saat ini?', type: 'mcq', required: true, options: ['Sangat Mudah', 'Mudah', 'Cukup', 'Sulit'] },
    { id: 'q4', text: 'Bagaimana pendapat Anda mengenai desain tampilan aplikasi?', type: 'mcq', required: true, options: ['Sangat Suka', 'Suka', 'Biasa', 'Tidak Suka'] },
    { id: 'q5', text: 'Pengaturan notifikasi saat ini bagi Anda...', type: 'mcq', required: true, options: ['Terlalu Banyak', 'Pas', 'Kurang', 'Tidak Perlu'] },
    { id: 'q6', text: 'Kecepatan aplikasi saat digunakan sehari-hari?', type: 'mcq', required: true, options: ['Sangat Cepat', 'Cepat', 'Cukup', 'Lambat'] },
    { id: 'q7', text: 'Apakah Anda ingin mode gelap (Dark Mode)?', type: 'mcq', required: true, options: ['Ya', 'Tidak'] },
    { id: 'q8', text: 'Prioritas utama perbaikan menurut Anda?', type: 'mcq', required: true, options: ['Stabilitas', 'Performa', 'Fitur Baru', 'UI/UX'] },
    { id: 'q9', text: 'Masukan fitur yang paling Anda inginkan.', type: 'text', required: true },
    { id: 'q10', text: 'Kritik/saran untuk meningkatkan kualitas aplikasi.', type: 'text', required: true },
  ], []);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadTask = async () => {
      if (!taskId) return;
      try {
        const t = await dataService.getTaskById(taskId);
        setTask(t || null);
      } catch (e) {
        console.error('Failed to load task', e);
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [taskId]);

  const handleAnswer = (qid: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    if (errors[qid]) {
      setErrors(prev => ({ ...prev, [qid]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const q of questions) {
      if (q.required && !answers[q.id]) {
        newErrors[q.id] = 'Pertanyaan ini wajib diisi.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !task) return;
    if (!validate()) return;

    try {
      setSubmitting(true);
      // Simpan jawaban sebagai JSON string dalam content.text
      const contentText = JSON.stringify({ taskId: task.id, answers }, null, 2);
      await dataService.createSubmission({
        taskId: task.id,
        userId: user.id,
        content: { text: contentText },
        status: 'pending'
      });
      alert('Terima kasih! Jawaban survey Anda telah dikirim.');
      navigate('/tasks');
    } catch (err) {
      console.error('Submit survey error:', err);
      alert('Gagal mengirim survey, coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Survey" onMenuClick={() => {}} />
          <main className="flex-1 overflow-y-auto p-4">
            <p className="text-gray-600">Memuat survey...</p>
          </main>
        </div>
      </div>
    );
  }

  const isSurvey = task?.category === 'survey';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={task ? task.title : 'Survey'} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003399] via-[#0b2a8f] to-[#001e6e] p-6 text-white mb-6">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="text-yellow-300" size={22} />
                  <h2 className="text-xl sm:text-2xl font-bold">{isSurvey ? 'Kuesioner Survey' : 'Form Tugas'}</h2>
                </div>
                <p className="text-blue-100 text-sm sm:text-base">Mohon isi pertanyaan berikut sesuai pengalaman Anda.</p>
              </div>
            </div>

            {/* Task meta */}
            {task && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <p className="text-sm font-semibold capitalize">{task.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reward</p>
                    <p className="text-sm font-semibold">Rp {task.reward.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="text-sm font-semibold">{task.deadline.toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#003399]/10 text-[#003399] flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 mb-3">{q.text}</p>
                      {q.type === 'mcq' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options!.map(opt => (
                            <label key={opt} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${answers[q.id] === opt ? 'border-[#003399] bg-[#003399]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={answers[q.id] === opt}
                                onChange={(e) => handleAnswer(q.id, e.target.value)}
                              />
                              <span className="text-sm text-gray-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {q.type === 'text' && (
                        <textarea
                          className="mt-1 w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                          rows={4}
                          placeholder="Tulis jawaban Anda di sini..."
                          value={answers[q.id] || ''}
                          onChange={(e) => handleAnswer(q.id, e.target.value)}
                        />
                      )}
                      {errors[q.id] && (
                        <p className="mt-2 text-xs text-red-600">{errors[q.id]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 sm:flex-none sm:px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-[#003399] hover:text-[#003399] transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  <span>Kembali</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-[#003399] to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={18} />
                  <span>{submitting ? 'Mengirim...' : 'Kirim Jawaban'}</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
