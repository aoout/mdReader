// Filter component that renders a search input field
const Filter = ({ value, onChange }) => (
    <div class="search-row"> 
        <div class="search-input-container global-search-input-container">
            <input 
                enterkeyhint="search" 
                type="search" 
                spellcheck="false" 
                placeholder="Search..." 
                value={value} 
                onchange={onChange} 
            />
        </div>
    </div>
);

// BookCard component to display individual book
const BookCard = ({ page }) => {
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 110 : 200; // 55% of original width on mobile
    const imageWidth = isMobile ? 77 : 140; // 55% of original width
    const imageHeight = isMobile ? 110 : 200; // 55% of original height

    const styles = {
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isMobile ? '5px' : '10px',
            gap: isMobile ? '4px' : '8px',
            width: `${cardWidth}px`,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 192, 203, 0.2)',
            transition: 'all 0.3s ease'
        },
        title: {
            textAlign: 'center',
            width: '100%',
            height: '1.5em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '0 5px',
            fontWeight: '500',
            fontSize: isMobile ? '0.8em' : '1em'
        },
        image: {
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            objectFit: 'cover'
        }
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.backgroundColor = 'rgba(173, 216, 230, 0.3)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 192, 203, 0.3)';
    };

    return (
        <div 
            style={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {page.$frontmatter?.cover?.value && (
                <a 
                    href={page.$path}
                    className="internal-link"
                    data-href={page.$path}
                    target="_blank"
                    rel="noopener"
                    data-tooltip-position="top"
                >
                    <img src={app.vault.adapter.getResourcePath(page.$frontmatter.cover.value)} style={styles.image} />
                </a>
            )}
            <div style={styles.title}>{page.$frontmatter?.title?.value || page.$name}</div>
        </div>
    );
};

// Main Books component
const Books = () => {
    const query = dc.useQuery('@page AND title');
    const [filter, setFilter] = dc.useState('');
    const isMobile = window.innerWidth <= 768;
    
    const allPages = dc.useArray(query, (array) => array
        .sort((a, b) => {
            const titleA = a.$frontmatter?.title?.value || a.$name;
            const titleB = b.$frontmatter?.title?.value || b.$name;
            return titleA.localeCompare(titleB);
        })
    );

    const filteredPages = dc.useMemo(() => (
        allPages.filter(page => {
            if (filter === '') return true;
            
            const title = page.$frontmatter?.title?.value || page.$name;
            return title.toLowerCase().includes(filter.toLowerCase());
        })
    ), [allPages, filter]);

    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '100px' : '180px'}, 1fr))`,
            gap: isMobile ? '10px' : '20px',
            padding: isMobile ? '10px' : '20px'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: isMobile ? '0 10px' : '0 20px'
        }
    };

    return (
        <>
            <div style={styles.header}>
                <div style={{ flex: 1 }}>
                    <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
            </div>
            <div style={styles.container}>
                {filteredPages.map(page => (
                    <BookCard key={page.$path} page={page} />
                ))}
            </div>
        </>
    );
};

// Export the Books component
return { Books };