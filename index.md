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
- [[프록시 뒤에서 클라이언트 실 IP 전달]] — 프록시마다 TCP 출발지가 바뀌므로 원래 IP는 XFF로 넘기고, 신뢰 프록시가 덧붙인 값만 읽음. 맨 앞 값 위조, nginx realip 모듈(기본 빌드 아님) (draft)
- [[Podman과 Docker 엔진 차이]] — compose 파일은 같고 엔진이 다름. dockerd 데몬 vs 데몬 없음(conmon), docker.sock → podman.sock 링크, 재부팅 재시작(4.9는 always만), 저장소·rootless·로그 드라이버 차이, RHEL 8 패키지 충돌 (draft)
- [[KV 캐시]] — 처리한 토큰의 K·V를 저장해 재계산을 없애는 메모리. 크기가 요청 수·토큰 수에 비례. vLLM은 공용 블록, Ollama는 슬롯 × 컨텍스트로 잡음 (draft)
- [[vLLM과 Ollama 동시성 차이]] — vLLM은 스텝마다 토큰 예산으로 배치를 다시 짜고 모자라면 preemption, Ollama는 슬롯(기본 1)과 큐. 작동 과정별 표 (draft)
- [[vLLM과 Ollama 설정값과 튜닝]] — max-num-batched-tokens 등 설정값 의미와 증상별 조치, ITL·TTFT 맞바꿈, Ollama는 NUM_PARALLEL × CONTEXT_LENGTH 메모리 (draft)
- [[HA 클러스터 VIP와 하트비트]] — 통신 경로(하트비트)는 LifeKeeper 문서상 노드 간 통신 수단이며 하나뿐이면 NIC·라우터가 단일 장애점. VIP 정의·스플릿 브레인은 미확인 (draft)
- [[공유 디스크 HA와 스트리밍 복제 HA 차이]] — 데이터 한 벌 공유 vs 서버마다 한 벌+WAL 복제. 대기 노드에 PG가 이미 포트를 잡고 있으면 넘길 때 EADDRINUSE (draft)
- [[같은 포트를 두 프로세스가 못 쓰는 이유]] — bind의 EADDRINUSE, PG 소켓 .lock은 소켓 파일을 이식성 있게 잠글 수 없어 둔 일반 파일 (draft)
- [[PostgreSQL 복제 슬롯]] — 대기 서버가 받을 때까지 WAL을 보존. 대기가 멈추면 pg_wal이 찰 수 있어 max_slot_wal_keep_size로 상한, active는 스트리밍 중 여부 (draft)
- [[HA 클러스터 관리 서비스와 부팅 자동 시작]] — 클러스터가 제어할 systemd 서비스는 enable하지 않는다(Pacemaker 문서). enable은 시작이 아니라 링크 생성, failed 상태 읽기 (draft)
- [[리눅스 NIC 이름 결정 방식]] — ens3의 en은 이더넷, s는 PCI 슬롯. NamePolicy 순서로 정해지고 커널 이름은 재부팅 사이 불안정. ens8과 슬롯 이름 불일치는 열린 질문 (draft)
- [[udev 규칙과 systemd link 파일 차이]] — 규칙은 맞는 줄 모두, .link는 첫 번째 맞는 파일만. 다른 이름 복사는 원본이 남음, Name=은 NamePolicy=보다 약함 (draft)
- [[dracut과 initramfs]] — initramfs는 부팅 초기 이미지, dracut이 만듦. 인자 없으면 실행 중 커널 기준, --kver로 지정 (draft)
- [[클라우드 메타데이터 network_data.json]] — 169.254.169.254에서 읽는 NIC·네트워크 JSON. type ipv4/ipv4_dhcp, ip_address·netmask·routes는 선택 필드, 빈 routes 허용 (draft)
- [[두 번째 NIC의 DEFROUTE]] — DEFROUTE=no는 이 연결에 기본 경로를 주지 않음(NetworkManager). 응답 경로 문제는 미확인 (draft)

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
- [[nginx realip 모듈]] — 씨앗. 믿는 주소에서 온 요청이면 헤더 값으로 nginx가 보는 클라이언트 주소를 바꾸는 모듈 (unexplored)
- [[PROXY protocol]] — 씨앗. 프록시가 원래 클라이언트 주소를 함께 알리는 방식 (unexplored)
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

#### HA 클러스터
- [[메타데이터 서비스]] — 씨앗. VM 안에서 169.254.169.254로 읽는 클라우드 정보 서비스 (unexplored)
- [[NetworkManager]] — 씨앗. ifcfg-rh 플러그인으로 ifcfg 파일을 읽고 쓰는 네트워크 설정 프로그램 (unexplored)
- [[systemd-udevd]] — 씨앗. .link의 이름 정책을 받아 NAME을 정하는 쪽 (unexplored)
- [[HA 클러스터]] — 씨앗. 서버 여러 대가 한 서비스를 맡고 한 대가 못 쓰면 다른 대가 이어받는 구성 (unexplored)
- [[PostgreSQL 스트리밍 복제]] — 씨앗. 대기 서버가 주 서버의 WAL 흐름을 받아 따라가는 복제 (unexplored)
- [[WAL]] — 씨앗. write-ahead log. 대기 서버가 읽는 기록 흐름 (unexplored)

## 개발 외 (life)
