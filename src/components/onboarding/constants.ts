// 기능 카테고리 enum 정의
export enum EFeatureCategory {
  PROJECT = 'project',
  CODE = 'code',
  FEEDBACK = 'feedback',
  RECORD = 'record',
  LEARNING = 'learning',
  ALERT = 'alert',
}

// 온보딩 페이지의 텍스트 내용
export const ONBOARDING_TEXTS = {
  PRIMARY_HEADING: 'GitHub 커밋 기반 맞춤 CS 면접 준비,',
  SECONDARY_HEADING: 'CoMentor와 함께!',
  DESCRIPTION:
    '자신의 GitHub 프로젝트에서 사용한 CS 개념을 분석하고, 맞춤형 면접 질문으로 준비하세요.',
  BUTTON_TEXT: 'Github 연동하기',
  FEATURES_HEADING: '다양한 기능으로 효과적인 취업 준비를',
  FEATURES: [
    {
      title: '맞춤형 CS 질문',
      description:
        '자신의 프로젝트에서 사용된 CS 개념을 기반으로 맞춤형 질문을 생성합니다.',
      category: EFeatureCategory.PROJECT,
    },
    {
      title: '코드 기반 분석',
      description:
        '실제 코드에서 어떤 CS 개념이 적용되었는지 분석하고 정리합니다.',
      category: EFeatureCategory.CODE,
    },
    {
      title: '피드백 시스템',
      description:
        '답변에 대한 즉각적인 피드백을 받아 개선할 점을 파악할 수 있습니다.',
      category: EFeatureCategory.FEEDBACK,
    },
    {
      title: '학습 기록 관리',
      description:
        '질문과 답변, 피드백을 모두 저장하여 언제든지 복습할 수 있습니다.',
      category: EFeatureCategory.RECORD,
    },
    {
      title: 'CS 지식 확장',
      description:
        '프로젝트에서 직접 사용해보지 않은 CS 개념도 학습할 수 있습니다.',
      category: EFeatureCategory.LEARNING,
    },
    {
      title: '알림 서비스',
      description:
        '매일 생성되는 사용자 스택 맞춤형 CS 질문을 알림으로 알려드립니다.',
      category: EFeatureCategory.ALERT,
    },
  ] as const,
}

// 애니메이션 에러 메시지
export const ANIMATION_ERROR_MESSAGES = {
  LOADING_ERROR:
    '애니메이션을 로드할 수 없습니다. 하지만 걱정하지 마세요! CommitMentor는 계속해서 당신의 CS 학습을 도울 준비가 되어 있습니다.',
}

// 온보딩 애니메이션 설정
export const ONBOARDING_ANIMATIONS = {
  MAIN: '/animations/coding-animation.json',
  SETTINGS: {
    LOOP: true,
    AUTOPLAY: true,
  },
}
