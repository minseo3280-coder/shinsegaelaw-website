"use client";

import { useState } from "react";
import { X, FileText, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";

const DOCUMENTS = [
  { id: "divorce-agreement", label: "이혼합의서", desc: "양측이 합의한 이혼 조건을 정리한 서류" },
  { id: "divorce-application", label: "협의이혼신청서", desc: "가정법원에 제출하는 협의이혼 신청 서류" },
  { id: "child-custody", label: "자녀양육에 관한 합의서", desc: "양육권, 양육비, 면접교섭 등을 정리한 서류" },
  { id: "mediation", label: "조정신청서", desc: "법원에 조정을 신청하기 위한 서류" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DocumentModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelected(null);
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(handleClose, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-burgundy-50 flex items-center justify-center">
              <FileText size={16} className="text-burgundy-500" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900">서류작성 도우미</h3>
              <p className="text-[12px] text-gray-400">
                {submitted ? "완료" : `단계 ${step}/2`}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        {!submitted && (
          <div className="h-[3px] bg-gray-100">
            <div
              className="h-full bg-burgundy-500 transition-all duration-500"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          {submitted ? (
            /* 완료 상태 */
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h4 className="text-[18px] font-bold text-gray-900 mb-2">
                서류작성 요청 완료
              </h4>
              <p className="text-[15px] text-[#444444] leading-relaxed">
                담당 변호사가 확인 후<br />빠른 시간 내에 연락드리겠습니다.
              </p>
            </div>
          ) : step === 1 ? (
            /* Step 1: 서류 선택 */
            <>
              <div className="mb-5">
                <h4 className="text-[18px] font-bold text-gray-900 mb-1">
                  어떤 서류가 필요하신가요?
                </h4>
                <p className="text-[14px] text-gray-400">
                  원만하고 빠른 이혼을 원한다면, 소송 없이도 진행할 수 있습니다.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelected(doc.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                      selected === doc.id
                        ? "border-burgundy-500 bg-burgundy-50/50"
                        : "border-gray-200 hover:border-burgundy-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selected === doc.id
                        ? "border-burgundy-500 bg-burgundy-500"
                        : "border-gray-300"
                    }`}>
                      {selected === doc.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className={`text-[15px] font-semibold transition-colors ${
                        selected === doc.id ? "text-burgundy-600" : "text-gray-900"
                      }`}>
                        {doc.label}
                      </p>
                      <p className="text-[13px] text-gray-400 mt-0.5">{doc.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => selected && setStep(2)}
                disabled={!selected}
                className="w-full mt-5 py-3 rounded-xl bg-burgundy-500 hover:bg-burgundy-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-[15px] font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                다음
                <ChevronRight size={16} />
              </button>
            </>
          ) : (
            /* Step 2: 정보 입력 */
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-[14px] text-gray-400 hover:text-burgundy-500 transition-colors mb-4"
              >
                <ArrowLeft size={14} />
                이전 단계
              </button>

              <div className="mb-5">
                <h4 className="text-[18px] font-bold text-gray-900 mb-1">
                  연락처를 남겨주세요
                </h4>
                <p className="text-[14px] text-gray-400">
                  선택하신 <span className="text-burgundy-500 font-semibold">{DOCUMENTS.find(d => d.id === selected)?.label}</span> 작성을 도와드리겠습니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="이름"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100 transition-all"
                />
                <input
                  type="tel"
                  placeholder="연락처 (010-0000-0000)"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100 transition-all"
                />
                <input
                  type="email"
                  placeholder="이메일 (선택)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100 transition-all"
                />

                <div className="flex items-start gap-2 mt-1">
                  <input type="checkbox" required className="mt-1 rounded border-gray-300" />
                  <label className="text-[12px] text-gray-400 leading-relaxed">
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-burgundy-500 hover:bg-burgundy-600 text-white text-[15px] font-semibold transition-all duration-200"
                >
                  서류작성 요청하기
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
