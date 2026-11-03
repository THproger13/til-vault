# 개념 목록

> Claude가 볼트 전체를 읽지 않도록 개념 노트의 한 줄 요약을 모아둔다. 노트를 만들 때마다 한 줄씩 추가한다.
> 형식: `- [[노트명]] — 한 줄 요약 (status)`

## 개발

- [[메시지 큐]] — 묶음 노트(hub). RabbitMQ 큐 개요, 하위 DLQ와 다음에 볼 개념 지도 (draft)
- [[DLQ]] — DLX를 거쳐 처리 못 한 메시지가 모이는 일반 큐. 4가지 경우, DLX 없으면 조용히 버려짐, 4.0 quorum 기본 delivery-limit 20 등 운영 시나리오. 소비자 장애 대비는 수동 ack. Spring AMQP 기본값(AUTO + requeue)의 무한 재전달 함정 예제 (draft)
- [[리눅스 파일시스템]] — 묶음 노트(hub). 트리 하나와 여러 장치를 잇는 마운트 개요, 하위 개념 지도 (draft)
- [[리눅스 디렉토리와 물리 디스크]] — 디렉토리 트리와 장치를 잇는 마운트, du·df·findmnt·lsblk가 보는 층의 차이, df·du 불일치 원인 (draft)
- [[네트워크와 방화벽]] — 묶음 노트(hub). 서비스 문제와 방화벽 문제를 가르는 개요, 하위 개념 지도 (draft)
- [[L4 포트 오픈 여부와 방화벽 상태]] — 포트 상태 3가지(열림·닫힘·필터됨)와 DROP·REJECT 구분, L4 리스너 포트와 대상 포트 두 구간 확인 (draft)
- [[방화벽 확인 도구 ping·nc·tcpdump 차이]] — ping은 ICMP라 포트 방화벽을 못 봄, nc -zv는 TCP 포트 연결 결과, tcpdump는 한 지점에서 SYN 도착·응답 관찰. 공통 키워드 표 (draft)
- [[Podman과 Docker 엔진 차이]] — compose 파일은 같고 엔진이 다름. dockerd 데몬 vs 데몬 없음(conmon), docker.sock → podman.sock 링크, 재부팅 재시작(4.9는 always만), 저장소·rootless·로그 드라이버 차이, RHEL 8 패키지 충돌 (draft)
- [[KV 캐시]] — 처리한 토큰의 K·V를 저장해 재계산을 없애는 메모리. 크기가 요청 수·토큰 수에 비례. vLLM은 공용 블록, Ollama는 슬롯 × 컨텍스트로 잡음 (draft)
- [[vLLM과 Ollama 동시성 차이]] — vLLM은 스텝마다 토큰 예산으로 배치를 다시 짜고 모자라면 preemption, Ollama는 슬롯(기본 1)과 큐. 작동 과정별 표 (draft)
- [[vLLM과 Ollama 설정값과 튜닝]] — max-num-batched-tokens 등 설정값 의미와 증상별 조치, ITL·TTFT 맞바꿈, Ollama는 NUM_PARALLEL × CONTEXT_LENGTH 메모리 (draft)

### 씨앗 (연관 개념, 아직 질문 전)

#### 메시지 큐
- [[RabbitMQ ack 모드]] — 씨앗. 소비자가 처리 완료를 알리는 방식. 소비자 장애 대비는 수동 ack (unexplored)
- [[DLX]] — 씨앗. 처리 못 한 메시지를 다시 받는 교환기. 여기 묶인 큐가 DLQ (unexplored)
- [[메시지 TTL]] — 씨앗. 메시지가 큐에 머물 수 있는 최대 시간 (unexplored)
- [[큐 길이 제한]] — 씨앗. 큐에 쌓을 수 있는 개수·용량 상한과 넘칠 때 동작 (unexplored)
- [[quorum 큐]] — 씨앗. Raft로 여러 노드에 복제되는 내구성 큐 (unexplored)
- [[publisher confirms]] — 씨앗. 브로커가 메시지를 안전하게 받았다고 생산자에게 알려 주는 확인 (unexplored)
- [[재시도 큐 패턴]] — 씨앗. TTL 대기 큐 + DLX로 일정 시간 뒤 다시 처리하는 구성 (unexplored)

#### 리눅스 파일시스템
- [[마운트]] — 씨앗. 장치의 파일시스템을 / 트리의 디렉토리에 붙이는 일 (unexplored)
- [[블록 장치]] — 씨앗. 블록 단위로 읽고 쓰는 저장 장치. lsblk가 보여 줌 (unexplored)
- [[LVM]] — 씨앗. 여러 디스크를 묶어 논리 볼륨으로 나눠 쓰는 계층 (unexplored)
- [[inode]] — 씨앗. 파일의 메타데이터를 담는 구조. 이름은 디렉토리 항목에 있음 (unexplored)
- [[fstab]] — 씨앗. 부팅 때 무엇을 어디에 마운트할지 적는 설정 파일 (unexplored)
- [[tmpfs]] — 씨앗. 메모리에 파일을 두는 파일시스템. 재부팅하면 사라짐 (unexplored)

#### 네트워크와 방화벽
- [[L4 스위치]] — 씨앗. IP·포트만 보고 요청을 여러 서버로 나누는 장비 (unexplored)
- [[포트]] — 씨앗. 한 호스트 안에서 통신할 프로세스를 구분하는 16비트 번호 (unexplored)
- [[TCP 3-way handshake]] — 씨앗. SYN → SYN-ACK → ACK로 TCP 연결을 여는 절차 (unexplored)
- [[헬스 체크]] — 씨앗. 뒤쪽 서버가 살아 있는지 주기적으로 확인해 죽은 서버를 빼는 기능 (unexplored)
- [[TLS 종료]] — 씨앗. HTTPS 암호화를 서버 대신 로드밸런서에서 푸는 구성 (unexplored)
- [[SNAT와 DSR]] — 씨앗. 응답이 L4 장비를 거쳐 오는지(SNAT) 서버에서 바로 가는지(DSR) (unexplored)
- [[ICMP]] — 씨앗. IP 위의 오류·제어 메시지. ping과 도달 불가 오류, 포트 없음 (unexplored)
- [[상태 기반 방화벽]] — 씨앗. 연결 상태를 추적해 응답 패킷을 통과시키는 방화벽 (unexplored)
- [[pcap 필터 표현식]] — 씨앗. tcpdump가 볼 패킷을 고르는 문법 (unexplored)

#### 컨테이너
- [[컨테이너 엔진]] — 씨앗. 이미지를 받아 두고 컨테이너를 만들어 실행·관리하는 프로그램. Docker 엔진·Podman (unexplored)
- [[데몬]] — 씨앗. 백그라운드에서 계속 도는 서비스 프로세스. dockerd (unexplored)
- [[OCI 런타임]] — 씨앗. 컨테이너를 실제로 만드는 맨 아래 층(runc, crun) (unexplored)
- [[유닉스 도메인 소켓]] — 씨앗. 파일 경로를 주소로 쓰는 같은 머신 안 통신. docker.sock (unexplored)
- [[OverlayFS]] — 씨앗. 이미지 레이어(lower) 위에 쓰기 층(upper)을 겹쳐 merged로 보여 줌 (unexplored)
- [[rootless 컨테이너]] — 씨앗. 일반 계정으로 띄우는 컨테이너. 계정마다 저장소가 따로 (unexplored)
- [[conmon]] — 씨앗. Podman 컨테이너마다 붙는 감시 프로세스. 로그·종료 코드 (unexplored)

#### LLM 서빙
- [[LLM 서빙]] — 씨앗. LLM을 서버로 띄워 여러 요청에 답하게 하는 일. vLLM·Ollama (unexplored)
- [[어텐션]] — 씨앗. Query와 앞 토큰의 K·V로 다음 토큰을 예측할 표현을 계산하는 층 (unexplored)
- [[prefill과 decode]] — 씨앗. 프롬프트를 한꺼번에 처리하는 단계와 토큰을 하나씩 만드는 단계 (unexplored)
- [[PagedAttention]] — 씨앗. KV 캐시를 블록으로 나눠 저장하는 vLLM의 방식 (unexplored)
- [[continuous batching]] — 씨앗. 배치를 스텝마다 다시 구성해 요청을 빼고 넣는 방식 (unexplored)
- [[prefix caching]] — 씨앗. 같은 접두어의 KV 캐시 블록을 재사용하는 최적화 (unexplored)
- [[llama.cpp 슬롯]] — 씨앗. llama.cpp 서버의 동시 처리 칸. KV 캐시를 칸 수 × 칸당 토큰으로 잡음 (unexplored)

## 개발 외 (life)
