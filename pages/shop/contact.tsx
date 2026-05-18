import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, ChevronDown } from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

const faqs = [
  { q: 'Chính sách đổi trả như thế nào?', a: 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và hóa đơn mua hàng.' },
  { q: 'Thời gian giao hàng bao lâu?', a: 'Giao hàng nội thành TP.HCM và Hà Nội trong 2-4 giờ. Các tỉnh thành khác từ 1-3 ngày làm việc.' },
  { q: 'Sản phẩm có bảo hành không?', a: 'Tất cả sản phẩm đều được bảo hành chính hãng từ 12-24 tháng tùy theo nhà sản xuất.' },
  { q: 'Có hỗ trợ trả góp không?', a: 'Có, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng các ngân hàng lớn và ví điện tử.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 md:p-12 text-white text-center">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black mb-2">Liên hệ với chúng tôi</h1>
          <p className="text-white/80 text-lg">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact info */}
        <div className="space-y-4">
          {[
            { icon: MapPin, title: 'Địa chỉ', lines: ['123 Nguyễn Huệ, Quận 1', 'TP. Hồ Chí Minh'], color: 'text-red-500', bg: 'bg-red-50' },
            { icon: Phone, title: 'Điện thoại', lines: ['1900 1234 (Miễn phí)', '028 3822 1234'], color: 'text-green-500', bg: 'bg-green-50' },
            { icon: Mail, title: 'Email', lines: ['support@techhub.vn', 'sales@techhub.vn'], color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Clock, title: 'Giờ làm việc', lines: ['Thứ 2 - Thứ 7: 8:00 - 22:00', 'Chủ nhật: 9:00 - 20:00'], color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-sm text-gray-500">{line}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Live chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <Headphones className="w-6 h-6" />
              <p className="font-bold text-lg">Chat trực tiếp</p>
            </div>
            <p className="text-white/80 text-sm mb-4">Nhân viên tư vấn sẵn sàng hỗ trợ bạn ngay bây giờ</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition"
            >
              Bắt đầu chat
            </motion.button>
          </motion.div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gửi thành công!</h3>
                <p className="text-gray-500">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="0901 234 567"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chủ đề</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition text-sm bg-white">
                      <option>Tư vấn sản phẩm</option>
                      <option>Đổi trả hàng</option>
                      <option>Bảo hành</option>
                      <option>Khiếu nại</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition text-sm resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-200 transition-shadow"
                >
                  <Send className="w-5 h-5" />
                  Gửi tin nhắn
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Câu hỏi thường gặp</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">{faq.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}
