window.LEARNDNS_EN = {
  categories: [
    ['01', 'DNS Fundamentals', 'DNS architecture, purpose, and essential concepts.'],
    ['02', 'Domains and Hierarchy', 'How DNS names are structured and organized.'],
    ['03', 'Domain Registration', 'Registration actors, contracts, and domain lifecycle.'],
    ['04', 'DNS Zones', 'Administrative boundaries and authority.'],
    ['05', 'Servers and Resolvers', 'Who asks, who searches, and who answers.'],
    ['06', 'Records and Zone Files', 'DNS data types and zone file syntax.'],
    ['07', 'DNS Delegation', 'How parent zones delegate authority.'],
    ['08', 'Step-by-Step Resolution', 'The complete journey of a DNS query.'],
    ['09', 'DNS Administration', 'Zone operations, synchronization, and maintenance.'],
    ['10', 'Protocols and Tools', 'Transport, EDNS, and DNS troubleshooting.'],
    ['11', 'DNS Security', 'Threats, DNSSEC, and query privacy.'],
    ['12', 'DNS in Real Infrastructure', 'Enterprise networks, cloud, and service discovery.'],
    ['13', 'Standards and References', 'DNS RFCs and technical documentation.']
  ],

  articles: [
    {
      id: 'dns-que-es',
      cat: '01',
      title: 'What Is DNS and What Problem Does It Solve?',
      summary: 'The distributed system that allows people to use names instead of memorizing network addresses.',
      updated: 'Fundamentals',
      body: `
<p>The <strong>Domain Name System (DNS)</strong> is a distributed, hierarchical, and scalable system that stores and provides information associated with domain names. Its best-known function is translating names such as <code>www.example.com</code> into IP addresses, but DNS also publishes information about email, delegations, policies, and other services.</p>

<p>Applications use names because they are easier to remember and allow infrastructure to change without requiring people to learn a new address. DNS separates a service's logical identity from the network address it uses at a particular moment. A name can point to multiple addresses, change addresses, or return different data depending on the query type.</p>

<h2>DNS Is Not a Central Address Book</h2>
<p>There is no single computer containing every name on the Internet. Information is distributed across millions of zones managed by different organizations. The hierarchy makes it possible to locate the authority responsible for each part of the namespace. Resolvers query this hierarchy and temporarily cache responses to reduce latency and server load.</p>

<p>The system separates two functions: <strong>publishing data</strong> through authoritative servers and <strong>locating data</strong> through recursive resolvers. An authoritative server knows the official data for a zone. A recursive resolver searches for answers on behalf of a client and may reuse information stored in its cache.</p>

<h2>What Can DNS Publish?</h2>
<ul>
<li>IPv4 and IPv6 addresses through A and AAAA records.</li>
<li>Mail servers through MX records.</li>
<li>Authoritative name servers through NS records.</li>
<li>Aliases through CNAME records.</li>
<li>Policy, validation, and service information through TXT, CAA, SRV, and DNSSEC records.</li>
</ul>

<h2>Example: Name and Address</h2>
<p>If a zone contains an A record for <code>www.example.com</code> with the value <code>192.0.2.80</code>, a resolver can return that address when asked for the A record. This address belongs to the TEST-NET-1 block reserved for documentation; it does not represent a real public server.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>www.example.com.  3600  IN  A  192.0.2.80</pre>
</div>

<div class="callout"><strong>Important:</strong> DNS resolves names and publishes data. It does not deliver the web page or establish the HTTP/TLS connection. Those operations happen after a usable address has been obtained.</div>

<h2>Fundamental Properties</h2>
<p>DNS is hierarchical because names are organized into levels; distributed because administration is divided among zones; delegable because an authority can assign a branch to another organization; and cacheable because responses contain timing information, especially the TTL.</p>

<h2>Concepts You Should Distinguish</h2>
<table>
<tr><th>Concept</th><th>Meaning</th></tr>
<tr><td>Domain name</td><td>A name within the DNS tree, such as <code>example.com</code>.</td></tr>
<tr><td>Zone</td><td>A portion of the namespace managed as an administrative unit.</td></tr>
<tr><td>Record</td><td>Data published for a name and a record type.</td></tr>
<tr><td>Resolver</td><td>A component that obtains DNS answers for a client.</td></tr>
<tr><td>Authoritative server</td><td>A server that publishes the official data for a zone.</td></tr>
</table>`
    },

    {
      id: 'arquitectura-dns',
      cat: '01',
      title: 'Distributed and Hierarchical DNS Architecture',
      summary: 'Root servers, TLDs, domains, and the separation of responsibilities.',
      body: `
<p>The DNS namespace can be represented as an inverted tree. At the top is the <strong>root</strong>, represented by a dot (<code>.</code>). Below the root are top-level domains (TLDs), such as <code>com</code>, <code>org</code>, and <code>cr</code>. Under each TLD are registered domains, and under those domains there may be additional subdomains.</p>

<h2>The Hierarchy Is Also a Hierarchy of Authority</h2>
<p>The hierarchy is not simply a way of writing names. It distributes responsibility. The root zone knows which servers handle each TLD. A TLD zone knows the delegations for registered domains beneath it. A domain's zone publishes its own records or delegates subdomains to other authorities.</p>

<div class="diagram">
<div class="diagram-title">SIMPLIFIED DNS NAME HIERARCHY</div>
<div class="flow">
<div class="flow-node"><b>.</b>Root</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>com</b>TLD</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>example</b>Second level</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>www</b>Host / subdomain</div>
</div>
<div class="diagram-caption">The name is read from the most specific label toward the root: www.example.com.</div>
</div>

<h2>Administrative Distribution</h2>
<p>An organization managing <code>example.com</code> does not need to operate the root servers or the TLD servers. The parent publishes a delegation indicating where the child zone can be found. Each operator therefore maintains only the zones for which it is responsible.</p>

<p>This architecture allows DNS to scale, distributes administration, and maintains availability even when different parts of the namespace are operated by independent organizations.</p>`
    },

    {
      id: 'dominios-etiquetas',
      cat: '02',
      title: 'Labels, FQDNs, and Absolute Names',
      summary: 'The anatomy of a DNS name, trailing dots, and name length limits.',
      body: `
<p>A DNS name consists of <strong>labels</strong> separated by dots. In <code>api.dev.example.com.</code>, the labels are <code>api</code>, <code>dev</code>, <code>example</code>, and <code>com</code>. The final dot represents the root.</p>

<h2>FQDNs and the Trailing Dot</h2>
<p>A fully qualified domain name (FQDN, in common usage) identifies a name from a specific label all the way to the root. Its absolute form ends with a dot: <code>www.example.com.</code>. Many interfaces omit the final dot for convenience, but the distinction between absolute and relative names is important in zone files and DNS tools.</p>

<p>A relative name is interpreted in relation to an origin, usually <code>$ORIGIN</code> in a zone file. If the origin is <code>example.com.</code>, the relative name <code>www</code> expands to <code>www.example.com.</code>.</p>

<h2>DNS Name Length Limits</h2>
<p>In the classic DNS format, each label can contain a maximum of 63 octets, and the complete encoded name can contain a maximum of 255 octets. This does not necessarily mean 255 visible characters. Internationalized domain names are converted to an ASCII representation, and length is measured in octets.</p>

<h2>IDNs and Punycode</h2>
<p>Internationalized domain names allow characters outside the ASCII character set. Applications convert each Unicode label into a compatible ASCII form, usually beginning with the prefix <code>xn--</code>, using Punycode. DNS resolution operates on this ASCII representation; Unicode conversion and display are handled by applications.</p>

<div class="callout"><strong>Precision:</strong> The trailing dot is not decoration. It prevents a tool or zone file from accidentally appending the origin to a name that is already absolute.</div>`
    },

    {
      id: 'registro-actores',
      cat: '03',
      title: 'ICANN, Registry, Registrar, and Registrant',
      summary: 'Who manages domain registration and who hosts DNS.',
      body: `
<p>Domain registration and DNS hosting are related but separate systems. Registration maintains the contractual right to use a name within a TLD. DNS publishes the information required to locate services and authoritative name servers.</p>

<h2>Actors and Responsibilities</h2>
<table>
<tr><th>Actor</th><th>Responsibility</th></tr>
<tr><td>ICANN</td><td>Coordinates policies and contracts relevant to the global naming system and accredits registrars for gTLDs.</td></tr>
<tr><td>IANA / PTI</td><td>Performs technical coordination functions, including root zone management and protocol parameter coordination.</td></tr>
<tr><td>Registry</td><td>Operates a TLD and maintains the authoritative registration database for domains under that extension.</td></tr>
<tr><td>Registrar</td><td>An intermediary that offers domain registration and manages operations with the registry.</td></tr>
<tr><td>Registrant</td><td>The contractual holder of the domain registration.</td></tr>
<tr><td>DNS provider</td><td>Hosts the zone and operates authoritative name servers.</td></tr>
</table>

<p>The same commercial provider may act as both registrar and DNS provider, but these remain separate functions. You can purchase a domain from one company and host its DNS zone with another.</p>

<h2>What Happens When You Register a Domain?</h2>
<ol>
<li>The customer chooses a name and a TLD.</li>
<li>The registrar checks availability through the registry system. This is not a normal DNS query.</li>
<li>The customer requests registration and provides the required information.</li>
<li>The registrar sends operations to the registry, commonly using EPP for many gTLDs.</li>
<li>The registry creates the domain object and records its registration period.</li>
<li>Name servers are configured, and the registry publishes the delegation in the TLD zone.</li>
<li>The domain holder creates the zone and its records at the DNS provider.</li>
</ol>

<h2>EPP</h2>
<p>The Extensible Provisioning Protocol (EPP), defined in RFC 5730 and related documents, allows registrars and registries to exchange domain lifecycle operations. These include checking availability, creating, updating, renewing, and transferring domain objects. EPP is not the protocol a browser uses to resolve <code>www.example.com</code>.</p>

<div class="callout"><strong>Key idea:</strong> Registering a domain does not automatically create a website or an email account. Registration reserves and manages the name; services require their own infrastructure and DNS records.</div>`
    },

    {
      id: 'ciclo-dominio',
      cat: '03',
      title: 'Domain Lifecycle and Statuses',
      summary: 'Registration, renewal, expiration, redemption, and deletion.',
      body: `
<p>A domain's lifecycle depends on its TLD and registry policies. Although details vary, many domains follow a general sequence: registration, active use, renewal, expiration, possible recovery, and eventual deletion.</p>

<h2>Registration Period</h2>
<p>When a domain is registered, the registry creates a domain object and records its expiration date. The registrant receives the right to use the domain for the registered period, subject to the applicable policies and registration agreement.</p>

<h2>Renewal</h2>
<p>A domain can usually be renewed before its expiration date. Renewal extends the registration period. Many registrars offer automatic renewal, but the domain holder should verify that the payment method and account information are current.</p>

<h2>Expiration</h2>
<p>If a domain is not renewed, it may enter an expiration or grace period. The exact behavior depends on the TLD and registrar. DNS service may stop working, the domain may be placed on hold, or the domain may continue resolving temporarily.</p>

<h2>Redemption and Deletion</h2>
<p>Some gTLDs provide a Redemption Grace Period after deletion has been requested. During this period, the previous registrant may be able to restore the domain, usually for an additional fee. If it is not restored, the domain may proceed to pending deletion and eventually become available for registration again.</p>

<h2>Common Domain Statuses</h2>
<table>
<tr><th>Status</th><th>General meaning</th></tr>
<tr><td>clientTransferProhibited</td><td>The registrar has placed a transfer lock on the domain.</td></tr>
<tr><td>clientUpdateProhibited</td><td>Updates are restricted by the registrar.</td></tr>
<tr><td>serverTransferProhibited</td><td>The registry has restricted transfers.</td></tr>
<tr><td>redemptionPeriod</td><td>The domain may be recoverable after deletion.</td></tr>
<tr><td>pendingDelete</td><td>The domain is awaiting final deletion.</td></tr>
</table>

<div class="callout"><strong>Important:</strong> Domain registration and DNS hosting are separate. A domain can remain registered while its DNS records are incorrect, unavailable, or hosted by a different provider.</div>`
    },

    {
      id: 'zonas-concepto',
      cat: '04',
      title: 'What Is a DNS Zone and How Is It Different from a Domain?',
      summary: 'The difference between the namespace and the administrative unit that publishes DNS data.',
      body: `
<p>A <strong>domain</strong> is a branch or name within the DNS namespace. A <strong>zone</strong> is an administrative portion of that namespace for which an organization maintains authoritative DNS data.</p>

<p>These concepts are related, but they are not interchangeable. A domain describes a position in the DNS tree. A zone describes the portion of that tree managed as an independent administrative unit.</p>

<h2>One Domain Can Be One Zone</h2>
<p>For a simple domain such as <code>example.com.</code>, the entire domain may be managed in a single zone. That zone can contain records for the domain itself and for names beneath it, such as:</p>

<ul>
<li><code>www.example.com.</code></li>
<li><code>mail.example.com.</code></li>
<li><code>api.example.com.</code></li>
<li><code>dev.example.com.</code></li>
</ul>

<h2>A Subdomain Does Not Automatically Become a Separate Zone</h2>
<p>For example, <code>dev.example.com.</code> is a subdomain of <code>example.com.</code>. It can remain inside the <code>example.com.</code> zone. It becomes a separate child zone only when the parent delegates authority for that name to other name servers.</p>

<h2>Example: A Child Zone</h2>
<p>Suppose the organization wants another team to manage <code>dev.example.com.</code>. The parent zone can contain a delegation such as:</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dev.example.com.  3600  IN  NS  ns1.dev.example.com.
dev.example.com.  3600  IN  NS  ns2.dev.example.com.</pre>
</div>

<p>The child zone is then managed independently by the servers named in the delegation. The parent zone does not need to contain every record belonging to the child zone.</p>

<h2>Where Does a Zone Begin and End?</h2>
<p>A zone begins at its apex, the name at which the zone is defined. It includes the names managed by that authority, except for portions delegated to child zones. A delegation creates an administrative boundary.</p>

<h2>Key Differences</h2>
<table>
<tr><th>Domain</th><th>Zone</th></tr>
<tr><td>A name or branch in the DNS namespace.</td><td>An administratively managed portion of the namespace.</td></tr>
<tr><td>Describes hierarchy.</td><td>Describes authority and management.</td></tr>
<tr><td>Can contain subdomains.</td><td>Can contain names below its apex until a child zone is delegated.</td></tr>
<tr><td>Does not require separate DNS servers.</td><td>Is served by authoritative name servers.</td></tr>
</table>

<div class="callout"><strong>Remember:</strong> Every zone is associated with a domain name, but not every subdomain is a separate zone.</div>`
    },

    {
      id: 'servidores-resolvers',
      cat: '05',
      title: 'Stub Resolver, Recursive Resolver, and Authoritative Server',
      summary: 'The difference between the client, the recursive search process, and the server that publishes official data.',
      body: `
<p>DNS resolution involves different components. Understanding their responsibilities is essential for troubleshooting and for following a query from an application to the server that owns the requested data.</p>

<h2>Stub Resolver</h2>
<p>A stub resolver is the DNS client component used by an operating system or application. It sends a query to a configured recursive resolver. It generally does not perform the entire iterative search through the DNS hierarchy itself.</p>

<h2>Recursive Resolver</h2>
<p>A recursive resolver receives a query from a client and attempts to obtain the final answer. It may already have the answer in its cache. If not, it can query root servers, TLD servers, and authoritative servers as necessary.</p>

<p>The recursive resolver performs the search on behalf of the client. It may also validate DNSSEC signatures if DNSSEC validation is enabled.</p>

<h2>Authoritative Name Server</h2>
<p>An authoritative name server publishes the official DNS data for one or more zones. It does not need to search the entire DNS hierarchy to answer for data within a zone it serves.</p>

<h2>How They Work Together</h2>
<ol>
<li>An application needs the address of <code>www.example.com</code>.</li>
<li>The stub resolver sends a query to its configured recursive resolver.</li>
<li>The recursive resolver checks its cache.</li>
<li>If the answer is not cached, the recursive resolver follows referrals through the DNS hierarchy.</li>
<li>The authoritative server for <code>example.com</code> returns the requested data.</li>
<li>The recursive resolver sends the answer to the client and may cache it.</li>
</ol>

<div class="diagram">
<div class="diagram-title">SIMPLIFIED DNS QUERY FLOW</div>
<div class="flow">
<div class="flow-node"><b>Application</b>Requests a name</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Stub resolver</b>Sends query</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Recursive resolver</b>Finds answer</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Authoritative server</b>Publishes data</div>
</div>
</div>

<h2>Important Distinction</h2>
<p>An authoritative server and a recursive resolver are defined by their roles, not simply by the physical machine they run on. DNS software can provide different services, but the responsibilities remain conceptually distinct.</p>

<div class="callout"><strong>Remember:</strong> The authoritative server publishes the official information. The recursive resolver searches for information on behalf of the client.</div>`
    },

    {
      id: 'registros-esenciales',
      cat: '06',
      title: 'DNS Record Structure and Essential Record Types',
      summary: 'Owner name, TTL, class, type, RDATA, and commonly used DNS records.',
      body: `
<p>A DNS resource record stores information associated with a name. Records are organized into resource record sets (RRsets) when they share the same owner name, class, and type.</p>

<h2>Basic Record Structure</h2>
<p>A common zone file record has the following structure:</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>www.example.com.  3600  IN  A  192.0.2.80</pre>
</div>

<table>
<tr><th>Field</th><th>Meaning</th></tr>
<tr><td>Owner name</td><td>The DNS name to which the record belongs.</td></tr>
<tr><td>TTL</td><td>The time, in seconds, that the record may be cached.</td></tr>
<tr><td>Class</td><td>The record class. IN means Internet.</td></tr>
<tr><td>Type</td><td>The kind of data stored, such as A, MX, or NS.</td></tr>
<tr><td>RDATA</td><td>The record's type-specific data.</td></tr>
</table>

<h2>A Record</h2>
<p>An A record associates a hostname with an IPv4 address.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>www.example.com.  3600  IN  A  192.0.2.80</pre></div>

<h2>AAAA Record</h2>
<p>An AAAA record associates a hostname with an IPv6 address.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>www.example.com.  3600  IN  AAAA  2001:db8::80</pre></div>

<h2>CNAME Record</h2>
<p>A CNAME record makes one DNS name an alias of another canonical name. The target must be a domain name, not an IP address.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>www.example.com.  3600  IN  CNAME  web-host.example.net.</pre></div>
<p>A CNAME owner generally cannot coexist with other ordinary data at the same name. This is why a CNAME is not normally placed at a zone apex.</p>

<h2>NS Record</h2>
<p>An NS record identifies the name servers responsible for a zone or delegated child zone.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>example.com.  3600  IN  NS  ns1.example.net.</pre></div>

<h2>MX Record</h2>
<p>An MX record identifies the mail servers that receive email for a domain. The preference value determines priority: lower numbers are preferred.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>example.com.  3600  IN  MX  10 mail.example.com.</pre></div>

<h2>TXT Record</h2>
<p>TXT records publish text data. They are commonly used for domain verification and email authentication policies such as SPF and other service-related information.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>example.com.  3600  IN  TXT  "v=spf1 include:mail.example.net -all"</pre></div>

<h2>SOA Record</h2>
<p>Every zone must have an SOA record at its apex. It contains information about the zone, including its primary server name, responsible party, serial number, and timing values.</p>
<div class="codeblock"><button class="copy-btn">Copy</button><pre>example.com.  3600  IN  SOA  ns1.example.com. hostmaster.example.com. (
  2026110401
  3600
  900
  1209600
  300
)</pre></div>

<h2>Other Important Record Types</h2>
<ul>
<li><strong>CAA:</strong> Specifies which certificate authorities may issue certificates for a domain.</li>
<li><strong>SRV:</strong> Publishes the location and port of a service.</li>
<li><strong>PTR:</strong> Used for reverse DNS lookups.</li>
<li><strong>DS:</strong> Connects a child zone's DNSSEC key to the parent zone's chain of trust.</li>
<li><strong>DNSKEY:</strong> Publishes a DNSSEC public key.</li>
<li><strong>RRSIG:</strong> Contains a DNSSEC signature over an RRset.</li>
</ul>

<div class="callout"><strong>Remember:</strong> The record type determines how the RDATA must be interpreted. An A record contains an IPv4 address; an MX record contains a preference and a mail server name; an NS record contains a name server name.</div>`
    },

    {
      id: 'soa-detalle',
      cat: '06',
      title: 'SOA: Serial Number and Timers',
      summary: 'How to interpret MNAME, RNAME, SERIAL, REFRESH, RETRY, EXPIRE, and MINIMUM.',
      body: `
<p>The <strong>Start of Authority (SOA)</strong> record contains administrative information about a DNS zone. Every zone must have one SOA record at its apex. The SOA is important for zone transfers, secondary server synchronization, and negative caching.</p>

<h2>SOA Example</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>example.com. 3600 IN SOA ns1.example.com. hostmaster.example.com. (
  2026110401
  3600
  900
  1209600
  300
)</pre>
</div>

<h2>SOA Fields</h2>
<table>
<tr><th>Field</th><th>Meaning</th></tr>
<tr><td>MNAME</td><td>The primary name server for the zone, according to the SOA data.</td></tr>
<tr><td>RNAME</td><td>The mailbox of the person responsible for the zone, represented using DNS name syntax.</td></tr>
<tr><td>SERIAL</td><td>A version number for the zone data.</td></tr>
<tr><td>REFRESH</td><td>How often a secondary should check whether the primary's serial has changed.</td></tr>
<tr><td>RETRY</td><td>How long a secondary waits before retrying a failed refresh attempt.</td></tr>
<tr><td>EXPIRE</td><td>How long a secondary may continue serving the zone without successfully refreshing it.</td></tr>
<tr><td>MINIMUM</td><td>Used as the negative caching TTL in modern DNS behavior.</td></tr>
</table>

<h2>SERIAL</h2>
<p>The serial identifies the version of the zone. When the primary zone changes, the serial should be increased. Secondary servers compare serial values to determine whether they need an update.</p>

<h2>REFRESH</h2>
<p>REFRESH defines how frequently a secondary checks the primary for a newer serial number.</p>

<h2>RETRY</h2>
<p>RETRY determines how long a secondary waits before trying again after a refresh attempt fails.</p>

<h2>EXPIRE</h2>
<p>EXPIRE defines the maximum time a secondary can continue serving the zone without successfully contacting the primary to refresh its data. Once this period expires, the secondary must stop treating the old zone data as valid.</p>

<h2>MINIMUM and Negative Caching</h2>
<p>In modern DNS, the SOA MINIMUM field is used in calculating the negative caching TTL for responses such as NXDOMAIN. It is not simply a universal minimum TTL for every record in the zone.</p>

<div class="callout"><strong>Remember:</strong> The SOA record is not just a collection of numbers. It coordinates zone versioning, secondary synchronization, and negative caching behavior.</div>`
    },

    {
      id: 'delegacion',
      cat: '07',
      title: 'How DNS Delegation Works',
      summary: 'The relationship between a parent zone and the authoritative servers of a child zone.',
      body: `
<p><strong>Delegation</strong> is the mechanism that allows one DNS zone to assign authority over a portion of its namespace to another set of name servers.</p>

<p>For example, the administrators of <code>example.com.</code> may delegate <code>dev.example.com.</code> to another team. The parent zone then tells resolvers which name servers are responsible for the child zone.</p>

<h2>Delegation in the Parent Zone</h2>
<p>The parent zone contains NS records identifying the authoritative servers for the child zone.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dev.example.com. 3600 IN NS ns1.dev.example.com.
dev.example.com. 3600 IN NS ns2.dev.example.com.</pre>
</div>

<h2>The Child Zone</h2>
<p>The child zone has its own apex and its own SOA record. It contains the records managed by the child zone's administrators.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>$ORIGIN dev.example.com.
@ 3600 IN SOA ns1.dev.example.com. hostmaster.dev.example.com. (
  2026110401 3600 900 1209600 300
)
@ 3600 IN NS ns1.dev.example.com.
@ 3600 IN NS ns2.dev.example.com.
www 3600 IN A 192.0.2.50</pre>
</div>

<h2>Glue Records</h2>
<p>Sometimes the name server is located inside the child zone it serves. For example, <code>ns1.dev.example.com.</code> is inside <code>dev.example.com.</code>. A resolver needs an IP address to reach that server, but it cannot obtain the address from the child zone until it reaches the child server. This creates a circular dependency.</p>

<p>The parent zone can publish glue address records to help break this dependency.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dev.example.com. 3600 IN NS ns1.dev.example.com.
ns1.dev.example.com. 3600 IN A 192.0.2.53</pre>
</div>

<h2>Delegation Is Not the Same as an NS Record Anywhere</h2>
<p>NS records can appear in different contexts. NS records at a zone apex identify the authoritative servers for that zone. NS records in a parent zone identify the delegation to a child zone.</p>

<div class="callout"><strong>Remember:</strong> A subdomain becomes a separate delegated zone when authority is transferred to child name servers. Merely creating a name such as <code>dev.example.com</code> does not automatically create a separate zone.</div>`
    },

    {
      id: 'resolucion-completa',
      cat: '08',
      title: 'A DNS Query from Beginning to End',
      summary: 'From the browser to the authoritative answer and the later web connection.',
      body: `
<p>When a user enters <code>www.example.com</code> into a browser, DNS resolution helps the application obtain the address required to contact the destination server.</p>

<h2>Step 1: The Application Checks Available Information</h2>
<p>The browser or operating system may already have the answer in a local cache. If no usable cached result exists, the system asks its configured DNS resolver.</p>

<h2>Step 2: The Stub Resolver Sends a Query</h2>
<p>The stub resolver sends a DNS query to a recursive resolver. The query identifies the name and record type, for example an A query for <code>www.example.com</code>.</p>

<h2>Step 3: The Recursive Resolver Checks Its Cache</h2>
<p>If the resolver has a valid cached answer, it can return it immediately. Otherwise, it begins the resolution process.</p>

<h2>Step 4: The Resolver Contacts the Root</h2>
<p>The resolver asks a root server where it can find information about the <code>com</code> TLD. The root server does not normally provide the final address for <code>www.example.com</code>. It provides a referral to the appropriate TLD name servers.</p>

<h2>Step 5: The Resolver Contacts the TLD</h2>
<p>The resolver asks a <code>com</code> TLD server where it can find the authoritative servers for <code>example.com</code>. The TLD server returns the delegation information.</p>

<h2>Step 6: The Resolver Contacts the Authoritative Server</h2>
<p>The resolver queries an authoritative server for <code>example.com</code>. That server returns the requested record, such as an A record containing an IPv4 address.</p>

<h2>Step 7: The Resolver Returns the Answer</h2>
<p>The recursive resolver sends the answer to the client and may cache it according to its TTL.</p>

<h2>Step 8: The Browser Connects to the Server</h2>
<p>After obtaining an address, the browser can establish the relevant network connection and proceed with HTTP or HTTPS. DNS resolution itself does not download the web page.</p>

<div class="diagram">
<div class="diagram-title">ITERATIVE DNS RESOLUTION</div>
<div class="flow">
<div class="flow-node"><b>Client</b>Requests www.example.com</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Recursive resolver</b>Checks cache</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Root</b>Refers to .com</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>TLD</b>Refers to example.com</div>
<div class="flow-arrow">→</div>
<div class="flow-node"><b>Authority</b>Returns the record</div>
</div>
</div>

<h2>What If the Name Does Not Exist?</h2>
<p>If the authoritative DNS data establishes that the requested name does not exist, the resolver may return <strong>NXDOMAIN</strong>. Negative answers can also be cached according to the relevant negative caching rules.</p>

<div class="callout"><strong>Remember:</strong> The recursive resolver performs the search. Root and TLD servers provide referrals. The authoritative server provides the official data for its zone.</div>`
    },

    {
      id: 'administracion-zonas',
      cat: '09',
      title: 'Zone Administration and Synchronization',
      summary: 'Editing zone data, serial numbers, NOTIFY, AXFR, and IXFR.',
      body: `
<p>DNS zones must be maintained when records change, services move, or infrastructure is updated. In a primary-secondary design, the primary holds the writable zone data and secondary servers maintain synchronized copies.</p>

<h2>Primary and Secondary Servers</h2>
<p>A primary server is the source from which updates are distributed. A secondary server obtains zone data from another authoritative server and serves its copy to DNS clients. Both primary and secondary servers can answer authoritatively for the zone.</p>

<h2>Serial Numbers</h2>
<p>The SOA serial indicates the version of the zone. After changing zone data, the administrator must increase the serial so secondary servers can identify that a newer version exists.</p>

<h2>NOTIFY</h2>
<p>NOTIFY is a message used by a primary server to inform configured secondary servers that zone data may have changed. It helps secondary servers check for updates sooner instead of waiting only for the SOA refresh interval.</p>

<h2>AXFR: Full Zone Transfer</h2>
<p>AXFR transfers the complete zone from one authoritative server to another. It is useful when a secondary needs an initial copy or when a full transfer is required.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig @ns1.example.com example.com AXFR</pre>
</div>

<h2>IXFR: Incremental Zone Transfer</h2>
<p>IXFR transfers only the changes between zone versions when the required history is available. It can reduce the amount of data transferred compared with a full AXFR.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig @ns1.example.com example.com IXFR=2026110401</pre>
</div>

<h2>Typical Synchronization Sequence</h2>
<ol>
<li>An administrator changes the zone on the primary server.</li>
<li>The zone serial number is increased.</li>
<li>The primary sends NOTIFY messages to configured secondary servers.</li>
<li>A secondary checks the SOA serial.</li>
<li>If the primary has a newer version, the secondary requests IXFR or AXFR.</li>
<li>The secondary updates its local copy and continues serving the zone.</li>
</ol>

<h2>Security and Access Control</h2>
<p>Zone transfers should be restricted to authorized secondary servers. TSIG can be used to authenticate messages between DNS servers. Allowing unrestricted AXFR can expose internal hostnames and infrastructure details.</p>

<div class="callout"><strong>Remember:</strong> NOTIFY signals that an update may be available. AXFR transfers an entire zone. IXFR transfers changes when possible. The SOA serial helps determine whether a secondary needs an update.</div>`
    },

    {
      id: 'protocolos-dns',
      cat: '10',
      title: 'UDP, TCP, Port 53, and EDNS(0)',
      summary: 'DNS transport, truncation, protocol extensions, and message size.',
      body: `
<p>DNS traditionally uses port <strong>53</strong> over both UDP and TCP. The transport selected depends on the operation and the requirements of the exchange.</p>

<h2>UDP Port 53</h2>
<p>Traditional DNS queries commonly use UDP because it has low overhead and is suitable for short request-and-response exchanges.</p>

<h2>TCP Port 53</h2>
<p>DNS also uses TCP. TCP is required for zone transfers and may be used for ordinary queries when necessary. Modern DNS implementations are expected to support TCP rather than treating it as an unusual fallback.</p>

<h2>Truncation and the TC Bit</h2>
<p>If a DNS response cannot fit within the permitted message size for the transport, the server may set the <strong>TC</strong> (truncated) bit. A client that receives a truncated UDP response may retry the query using TCP.</p>

<h2>EDNS(0)</h2>
<p>Extension Mechanisms for DNS (EDNS(0)) extends the DNS protocol so messages can advertise capabilities and support larger UDP payload sizes than the original DNS message limit.</p>

<p>EDNS(0) uses an OPT pseudo-record in the additional section. It is not an ordinary record stored in a zone file.</p>

<h2>Example with dig</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig example.com A
dig example.com A +tcp
dig example.com A +bufsize=1232</pre>
</div>

<h2>Transport Comparison</h2>
<table>
<tr><th>Transport</th><th>Typical use</th></tr>
<tr><td>UDP/53</td><td>Common DNS queries and responses.</td></tr>
<tr><td>TCP/53</td><td>Zone transfers and queries requiring TCP.</td></tr>
<tr><td>TLS/853</td><td>DNS over TLS (DoT).</td></tr>
<tr><td>HTTPS/443</td><td>DNS over HTTPS (DoH).</td></tr>
<tr><td>QUIC/853</td><td>DNS over QUIC (DoQ), commonly using UDP.</td></tr>
</table>

<div class="callout"><strong>Remember:</strong> DNS is not UDP-only. Port 53 supports both UDP and TCP, and EDNS(0) extends DNS message capabilities.</div>`
    },

    {
      id: 'herramientas-dns',
      cat: '10',
      title: 'DNS Troubleshooting with dig and Common Tools',
      summary: 'Commands for querying DNS, checking authority, validating zones, and observing DNS behavior.',
      body: `
<p>DNS troubleshooting requires more than checking whether a website loads. Tools such as <code>dig</code>, <code>nslookup</code>, and <code>host</code> allow administrators to query specific record types, contact specific name servers, and inspect DNS responses.</p>

<h2>What Is dig?</h2>
<p><code>dig</code> stands for Domain Information Groper. It is a command-line DNS query tool commonly used on Linux, macOS, and other Unix-like systems.</p>

<h2>Basic Query</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig example.com</pre>
</div>
<p>This performs a DNS query using the system's configured resolver.</p>

<h2>Query a Specific Record Type</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig example.com A
dig example.com AAAA
dig example.com MX
dig example.com NS
dig example.com SOA
dig example.com TXT</pre>
</div>

<h2>Query a Specific DNS Server</h2>
<p>Use the <code>@</code> symbol followed by the server name or address.</p>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig @1.1.1.1 example.com A
dig @8.8.8.8 example.com MX</pre>
</div>

<h2>Query an Authoritative Server Directly</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig @ns1.example.com example.com SOA
dig @ns1.example.com www.example.com A</pre>
</div>

<h2>Trace the Resolution Path</h2>
<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>dig +trace www.example.com</pre>
</div>
<p>This requests an iterative trace through the DNS hierarchy, starting at the root.</p>

<h2>Check Whether a Response Is Authoritative</h2>
<p>Look for the <code>aa</code> flag in the response header. It indicates that the responding server considers the answer authoritative for the queried data.</p>

<h2>Useful dig Options</h2>
<table>
<tr><th>Command</th><th>Purpose</th></tr>
<tr><td><code>dig +short</code></td><td>Displays a shorter answer.</td></tr>
<tr><td><code>dig +trace</code></td><td>Shows the iterative resolution path.</td></tr>
<tr><td><code>dig +tcp</code></td><td>Uses TCP for the query.</td></tr>
<tr><td><code>dig +dnssec</code></td><td>Requests DNSSEC-related data.</td></tr>
<tr><td><code>dig -x</code></td><td>Performs a reverse lookup.</td></tr>
</table>

<h2>What Is nslookup?</h2>
<p><code>nslookup</code> is another DNS query utility. It is available on many operating systems and can be used for basic name and record lookups.</p>

<div class="codeblock">
<button class="copy-btn">Copy</button>
<pre>nslookup example.com
nslookup -type=MX example.com
nslookup example.com 1.1.1.1</pre>
</div>

<h2>A Practical Troubleshooting Sequence</h2>
<ol>
<li>Query the name using the default resolver.</li>
<li>Query a different recursive resolver to compare results.</li>
<li>Query the authoritative name server directly.</li>
<li>Check the SOA and NS records.</li>
<li>Use <code>dig +trace</code> to inspect delegation and resolution.</li>
<li>Compare the result with the expected zone configuration.</li>
</ol>

<div class="callout"><strong>Remember:</strong> A successful query to a recursive resolver does not by itself prove that the authoritative zone is configured correctly. Query the authoritative server directly when troubleshooting.</div>`
    },

    {
      id: 'seguridad-dnssec',
      cat: '11',
      title: 'DNSSEC and the Chain of Trust',
      summary: 'How DNS data is authenticated and how DNSSEC validation works.',
      body: `
<p><strong>DNS Security Extensions (DNSSEC)</strong> add cryptographic authentication to DNS data. They allow a validating resolver to verify that DNS responses are authentic and have not been modified in transit or replaced with forged data.</p>

<h2>What DNSSEC Does</h2>
<p>DNSSEC provides data origin authentication and data integrity. It does not encrypt DNS queries, hide the names being requested, or guarantee that the published information is operationally correct.</p>

<h2>Important DNSSEC Records</h2>
<table>
<tr><th>Record</th><th>Purpose</th></tr>
<tr><td>DNSKEY</td><td>Publishes a zone's public signing keys.</td></tr>
<tr><td>RRSIG</td><td>Contains a cryptographic signature covering an RRset.</td></tr>
<tr><td>DS</td><td>Contains a digest that links a child zone's key to its parent.</td></tr>
<tr><td>NSEC</td><td>Provides authenticated proof that a name or record does not exist.</td></tr>
<tr><td>NSEC3</td><td>Provides authenticated denial of existence using hashed owner names.</td></tr>
</table>

<h2>The Chain of Trust</h2>
<p>DNSSEC validation follows a chain of trust from a trusted starting point, normally the root trust anchor. The parent zone publishes a DS record that corresponds to a DNSKEY in the child zone. The child's signatures can then be validated using its public keys.</p>

<ol>
<li>The resolver starts with a trusted root key.</li>
<li>The root zone's signed data is validated.</li>
<li>The root's DS information is used to authenticate the TLD's DNSKEY.</li>
<li>The TLD's DS record is used to authenticate the child zone's DNSKEY.</li>
<li>The child zone's RRSIG records are checked against its DNSKEY.</li>
<li>The resolver can accept the data as validated if the chain succeeds.</li>
</ol>

<h2>DNSSEC Validation Results</h2>
<p>A validating resolver may return different outcomes depending on the data and signatures:</p>
<ul>
<li><strong>Secure:</strong> The data has been successfully validated.</li>
<li><strong>Insecure:</strong> The zone is not protected by a complete DNSSEC chain.</li>
<li><strong>Bogus:</strong> Validation was expected but failed.</li>
<li><strong>Indeterminate:</strong> The resolver cannot determine the validation status.</li>
</ul>

<h2>DNSSEC Is Not Encryption</h2>
<p>DNSSEC authenticates DNS data. DoT, DoH, and DoQ encrypt DNS transport between a client and a resolver. These technologies solve different problems and can be used together.</p>

<div class="callout"><strong>Remember:</strong> DNSSEC helps verify that DNS data is authentic. It does not hide queries, encrypt the transport, or prevent every DNS attack.</div>`
    },

    {
      id: 'privacidad-amenazas',
      cat: '11',
      title: 'DNS Threats and Transport Privacy',
      summary: 'Spoofing, cache poisoning, amplification, hijacking, DoH, DoT, and DoQ.',
      body: `
<p>DNS can be targeted by attacks against integrity, availability, confidentiality, and administrative control. Effective defense depends on the entire architecture: recursive resolvers, authoritative servers, registrars, networks, credentials, and operational practices.</p>

<h2>Common DNS Threats</h2>
<ul>
<li><strong>Spoofing:</strong> Forging DNS responses to make a client believe it received legitimate information.</li>
<li><strong>Cache poisoning:</strong> Inserting false data into a resolver's cache so that other clients reuse the manipulated response.</li>
<li><strong>Hijacking:</strong> Unauthorized changes to delegation, domain configuration, or resolver infrastructure.</li>
<li><strong>Amplification and reflection:</strong> Abusing resolvers or authoritative servers to send large responses to a victim using a spoofed source IP address.</li>
<li><strong>Zone transfer exposure:</strong> Allowing unauthorized sources to perform AXFR and reveal an inventory of DNS names.</li>
<li><strong>Subdomain takeover:</strong> Exploiting a DNS record that points to an external resource that has been deleted or is no longer claimed.</li>
</ul>

<h2>Defensive Measures</h2>
<p>Restrict recursion to authorized clients; limit AXFR to known secondary servers; keep DNS software updated; use source port randomization and validation mechanisms; protect registrar accounts with MFA and transfer locks; monitor delegation and DNS changes; and remove records pointing to services you no longer control.</p>

<h2>Encrypted DNS</h2>
<table>
<tr><th>Technology</th><th>Transport</th><th>Common port</th></tr>
<tr><td>DoT</td><td>DNS over TLS</td><td>853/TCP</td></tr>
<tr><td>DoH</td><td>DNS over HTTPS</td><td>443/TCP or HTTP/3, depending on implementation</td></tr>
<tr><td>DoQ</td><td>DNS over QUIC</td><td>Usually 853/UDP</td></tr>
</table>

<p>Encryption protects the communication between the client and the resolver providing the encrypted DNS service. It does not make queries anonymous to that resolver, and it does not replace DNSSEC. Network policies and application behavior also influence which resolver is used.</p>

<div class="callout"><strong>Remember:</strong> DNSSEC protects data authenticity. DoT, DoH, and DoQ protect the transport between a client and a resolver. Neither category solves every DNS security problem.</div>`
    },

    {
      id: 'infraestructura-real',
      cat: '12',
      title: 'Private DNS, Split-Horizon, and Enterprise Networks',
      summary: 'DNS resolution designs for internal networks and corporate services.',
      body: `
<p>Real infrastructures may contain public and private namespaces, different resolvers for different networks, and conditional resolution policies. Not every internal name should be published on the Internet, and not every client should use the same resolver.</p>

<h2>Split-Horizon DNS</h2>
<p>With split-horizon DNS, the same query can receive different answers depending on its source or DNS view. For example, <code>portal.example.com</code> may resolve to a private IP address inside the corporate network and to a public IP address from the Internet.</p>

<p>The configuration must avoid inconsistent responses and account for caches that may retain data from a previous view.</p>

<h2>Forwarders and Conditional Forwarders</h2>
<p>A forwarder receives queries that another resolver sends to it for resolution. A conditional forwarder sends queries for a specific namespace to designated servers. This is common in organizations with multiple networks or internal domains.</p>

<h2>Active Directory</h2>
<p>Active Directory relies heavily on DNS to locate domain controllers and services through SRV records. Dynamic DNS updates allow computers and domain controllers to register their records. Incorrect DNS configuration can prevent authentication, service discovery, and domain operations even when general IP connectivity works.</p>

<h2>DHCP and Dynamic Updates</h2>
<p>DHCP can assign addresses and coordinate DNS updates to associate names with current addresses. The policy defining who updates which records must be consistent with security requirements and the lifecycle of DHCP leases.</p>

<div class="callout"><strong>Remember:</strong> Enterprise DNS is not only about public websites. It is also essential for internal applications, authentication, service discovery, and network operations.</div>`
    },

    {
      id: 'cloud-kubernetes',
      cat: '12',
      title: 'Anycast, GeoDNS, Cloud, and Kubernetes',
      summary: 'Global distribution, DNS-based routing, and service discovery.',
      body: `
<h2>Anycast</h2>
<p>With Anycast, multiple locations announce the same IP address. Network routing directs clients toward an instance based on network topology and routing policies. DNS can return an Anycast address, but the location selection is largely performed by IP routing rather than by a separate DNS decision for every query.</p>

<h2>GeoDNS</h2>
<p>GeoDNS returns different data based on the approximate location of the resolver or client, when the DNS infrastructure can infer it. It can help direct users toward nearby regions, but the inferred location may not match the end user's actual location, especially when shared resolvers or VPNs are involved.</p>

<h2>DNS in the Cloud</h2>
<p>Cloud providers offer public and private zones, APIs for managing records, health checks, and routing policies. Automation must control permissions, accidental changes, TTL values, and consistency between environments.</p>

<h2>Kubernetes and Service Discovery</h2>
<p>In Kubernetes, cluster DNS allows applications to resolve Services and pod names according to the cluster configuration. CoreDNS commonly acts as the cluster DNS server and can forward external queries.</p>

<p>Service names follow a namespace-based structure associated with the cluster domain. For example, a common name is <code>api.backend.svc.cluster.local</code>.</p>

<p>Kubernetes DNS makes service discovery easier, but it does not replace a load balancer or guarantee application health by itself. Service resolution and subsequent routing depend on network configuration and the type of Service.</p>

<div class="callout"><strong>Remember:</strong> DNS can help distribute traffic and discover services, but routing, health checks, and application availability involve additional infrastructure.</div>`
    },

    {
      id: 'rfcs',
      cat: '13',
      title: 'Fundamental DNS RFCs and Standards',
      summary: 'Technical documents that define DNS and its major extensions.',
      body: `
<p>DNS is defined and extended through technical documents published as RFCs (Request for Comments). Some RFCs are standards, while others describe practices or provide information. The fact that a document has an RFC number does not automatically mean it is a current normative standard. Its status and any updates or obsoleting documents should be checked.</p>

<table>
<tr><th>RFC</th><th>Topic</th><th>Importance</th></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc1034" target="_blank" rel="noopener">1034</a></td><td>DNS concepts and facilities</td><td>Architecture, namespace, resolvers, and servers.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc1035" target="_blank" rel="noopener">1035</a></td><td>Implementation and specification</td><td>Messages, formats, records, and basic operation.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc2181" target="_blank" rel="noopener">2181</a></td><td>DNS clarifications</td><td>Clarifies protocol details and record semantics.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc2308" target="_blank" rel="noopener">2308</a></td><td>Negative caching</td><td>Defines how negative DNS responses are cached.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc6891" target="_blank" rel="noopener">6891</a></td><td>EDNS(0)</td><td>Extensions that expand DNS message capabilities.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc4033" target="_blank" rel="noopener">4033</a></td><td>DNSSEC introduction and requirements</td><td>Security model and validation concepts.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc4034" target="_blank" rel="noopener">4034</a></td><td>DNSSEC records</td><td>DNSKEY, DS, RRSIG, and NSEC formats.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc4035" target="_blank" rel="noopener">4035</a></td><td>DNSSEC protocol modifications</td><td>Processing and validation of signed data.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc5155" target="_blank" rel="noopener">5155</a></td><td>NSEC3</td><td>Authenticated proof of nonexistence using hashed names.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc5936" target="_blank" rel="noopener">5936</a></td><td>AXFR</td><td>Full zone transfer.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc7766" target="_blank" rel="noopener">7766</a></td><td>DNS over TCP</td><td>TCP support requirements for DNS implementations.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc7858" target="_blank" rel="noopener">7858</a></td><td>DNS over TLS</td><td>Specifies DoT.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc8484" target="_blank" rel="noopener">8484</a></td><td>DNS over HTTPS</td><td>Specifies DoH.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc9250" target="_blank" rel="noopener">9250</a></td><td>DNS over QUIC</td><td>Specifies DoQ.</td></tr>
<tr><td><a href="https://www.rfc-editor.org/rfc/rfc9460" target="_blank" rel="noopener">9460</a></td><td>SVCB and HTTPS records</td><td>Service information and connection parameters.</td></tr>
</table>

<p>For implementation work, consult the text of each RFC and any documents that update it. This table is an introductory guide, not a replacement for reading the normative specification when compliance is required.</p>`
    }
  ],

  glossary: [
    ['A', 'A record that associates a name with an IPv4 address.'],
    ['AAAA', 'A record that associates a name with an IPv6 address.'],
    ['AA', 'The response flag indicating that an answer is authoritative.'],
    ['AXFR', 'A mechanism for transferring an entire DNS zone.'],
    ['CNAME', 'A record that makes one DNS name an alias of another name.'],
    ['DNSSEC', 'Extensions that authenticate DNS data using digital signatures.'],
    ['EDNS(0)', 'A mechanism that extends the capabilities of DNS messages.'],
    ['FQDN', 'A fully qualified domain name expressed from a label to the root.'],
    ['Glue', 'Auxiliary address data in a parent zone used to reach delegated name servers.'],
    ['MX', 'A record that identifies mail servers for a domain.'],
    ['NS', 'A record that identifies authoritative name servers.'],
    ['Resolver', 'A component that obtains DNS answers on behalf of a client.'],
    ['SOA', 'A mandatory zone metadata record located at the zone apex.'],
    ['TTL', 'The amount of time a DNS record may remain in a cache.'],
    ['Zone', 'A portion of the DNS namespace managed as an authoritative unit.']
  ]
};
